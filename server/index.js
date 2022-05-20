require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken');
const app = express();
const uploadsMiddleware = require('./uploadsMiddleware');
const argon2 = require('argon2');

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/garage', (req, res) => {
  const sql = `
    select *
      from "vehicles"
     order by "vehicleId"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => console.error(err));
});

app.post('/api/garage/add-car', uploadsMiddleware, (req, res, next) => {
  const { year, make, model } = req.body;
  if (!year || !make || !model) {
    throw new ClientError(400, "Vehicle 'year', 'make', and 'model' are required");
  }
  let photoUrl = null;
  if (req.file) {
    photoUrl = req.file.location;
  }
  const params = [1, parseInt(year), make, model, photoUrl];
  const sql = `
    insert into "vehicles" ("userId", "year", "make", "model", "photoUrl")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/garage/recent-history/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const sql = `
  select "v"."vehicleId",
       "v"."year",
       "v"."make",
       "v"."model",
       "v"."photoUrl",
       coalesce(
         (
           select json_agg("r" order by "r"."datePerformed" desc)
             from "records" as "r"
            where "r"."vehicleId" = $1
         ),
         '[]'::json
       ) as "records"
  from "vehicles" as "v"
 where "v"."vehicleId" = $1
  `;
  const params = [vehicleId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(401, `No vehicle history with vehicleId ${vehicleId} found`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/garage/add-record/:vehicleId', uploadsMiddleware, (req, res, next) => {
  const { vehicleId } = req.params;
  const { record, date, mileage, cost } = req.body;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  if (!record || !date || !mileage || !cost) {
    throw new ClientError(400, 'Maintenance name, date, mileage, and cost are required');
  }
  let photoUrl = null;
  if (req.file) {
    photoUrl = req.file.location;
  }
  const sql = `
    insert  into "records" ("vehicleId", "maintenanceName", "datePerformed", "mileage", "cost", "receiptUrl")
    values  ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [vehicleId, record, date, mileage, cost, photoUrl];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/vehicles/:vehicleId/records', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const sql = `
    select  json_agg("maintenanceName") as "names",
            json_agg("cost") as "cost",
            sum("cost") as "total",
            "mileage",
            to_char("datePerformed"::date, 'yyyy-mm-dd') as "datePerformed",
            json_agg("receiptUrl") as "receipt"
      from  "records"
     where  "vehicleId" = $1
     group  by "datePerformed", mileage
     order  by "datePerformed" desc
  `;
  const params = [vehicleId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(401, `No vehicle history with vehicleId ${vehicleId} found`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/garage/edit-car/:vehicleId', uploadsMiddleware, (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const { year, make, model } = req.body;
  let photoUrl = null;
  if (req.file) {
    photoUrl = req.file.location;
  }
  const params = [year, make, model, photoUrl, vehicleId];
  const sql = `
    update  "vehicles"
       set  "year" = $1,
            "make" = $2,
            "model" = $3,
            "photoUrl" = coalesce($4, "photoUrl")
     where  "vehicleId" = $5
     returning *
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/garage/:vehicleId/edit-records', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const { oldName, oldCost, newName, newCost, date } = req.body;
  if (!oldName || !oldCost || !newName || !newCost || !date) {
    throw new ClientError(400, 'Input Missing');
  }
  const params = [newName, newCost, oldName, oldCost, date];
  const sql = `
    update  "records"
       set  "maintenanceName" = $1,
            "cost" = $2
     where  "maintenanceName" = $3 and
            "cost" = $4 and
            "datePerformed" = $5
    returning *
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.delete('/api/garage/:vehicleId/delete-record', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const { cost, name, date } = req.body;
  if (!cost || !date || !name) {
    throw new ClientError(400, 'Input Missing');
  }
  const params = [name, cost, date, vehicleId];
  const sql = `
    delete  from "records"
     where  "maintenanceName" = $1 and
            "cost" = $2 and
            "datePerformed" = $3 and
            "vehicleId" = $4
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/garage/delete-car/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const params = [vehicleId];
  const sql = `
    with  "record" as (
              delete  from "records"
               where  "vehicleId" = $1
           returning  "vehicleId"
          )
  delete  from "vehicles" where "vehicleId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashed => {
      const params = [username, hashed];
      const sql = `
        insert  into "users" ("username", "hashedPassword")
                values($1, $2)
        on conflict ("username") do nothing
        returning *
      `;
      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
    select  *
      from  "users"
     where  "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [userInfo] = result.rows;
      if (!userInfo) {
        throw new ClientError(401, 'invalid login');
      }
      argon2.verify(userInfo.hashedPassowrd, password)
        .then(result => {
          if (!result) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            userId: userInfo.userId,
            username: userInfo.username
          };
          const token = jwt.sing(payload, process.env.JSON_PRIVATE_TOKEN);
          const resJSON = {
            token: token,
            user: payload
          };
          res.status(201).json(resJSON);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

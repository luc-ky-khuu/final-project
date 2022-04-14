require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/garage', (req, res) => {
  const sql = `
    select *
      from "vehicles"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => console.error(err));
});

app.post('/api/garage/add-car', (req, res, next) => {
  const { year, make, model } = req.body;
  if (!year || !make || !model) {
    throw new ClientError(400, "Vehicle 'year', 'make', and 'model' are required");
  }
  const params = [1, parseInt(year), make, model];
  const sql = `
    insert into "vehicles" ("userId", "year", "make", "model")
    values ($1, $2, $3, $4)
    returning *
  `;
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/garage/details/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  const sql = `
    select *
      from "vehicles"
     where "vehicleId" = $1
  `;
  const params = [vehicleId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(401, `No vehicle with vehicleId ${vehicleId} found`);
      }
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/garage/recent-history/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }

  // this query currently doesn't work when a new car with no history is clicked
  const sql = `
    select  to_char("datePerformed", 'YYYY-MM-DD') as "datePerformed",
            "mileage",
            string_agg("maintenanceName", ', '),
            "year",
            "make",
            "model",
            "photoUrl"
      from  "records"
      join  "vehicles" using ("vehicleId")
     where  "vehicleId" = $1
     group  by "datePerformed", "mileage", "year", "make", "model", "photoUrl"
     order  by "datePerformed" desc
     limit  4;
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
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

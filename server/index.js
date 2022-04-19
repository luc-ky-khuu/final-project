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

app.post('/api/garage/add-record/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  const { record, date, mileage, cost } = req.body;
  if (vehicleId < 1 || !Number(vehicleId)) {
    throw new ClientError(400, 'vehicleId must be a positive integer');
  }
  if (!record || !date || !mileage || !cost) {
    throw new ClientError(400, 'Maintenance name, date, mileage, and cost are required');
  }
  const sql = `
    insert  into "records" ("vehicleId", "maintenanceName", "datePerformed", "mileage", "cost")
    values  ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [vehicleId, record, date, mileage, cost];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/vehicles/:vehicleId/records', (req, res, next) => {
  const { vehicleId } = req.params;
  const sql = `
    select  json_agg("maintenanceName") as "names",
            json_agg("cost") as "cost",
            sum("cost") as "total",
            "mileage",
            to_char("datePerformed"::date, 'yyyy-mm-dd') as "datePerformed"
      from  "records"
     where  "vehicleId" = $1
     group  by "datePerformed", mileage
     order  by "datePerformed" desc
  `;
  const params = [vehicleId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

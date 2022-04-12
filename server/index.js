require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

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

app.post('/api/garage/add-car', (req, res) => {
  // const { year, make, model } = req.body;
  // const params = [year, make, model];
  // const sql = `
  //   insert into "vehicles" ("year", "make", "model")
  //   values ($1, $2, $3)
  // `;

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

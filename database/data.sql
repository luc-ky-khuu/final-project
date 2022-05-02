insert into "public"."users" (
  "username",
  "hashedPassword"
) values (
  'admin',
  'password'
);

insert into "public"."vehicles" (
  "userId",
  "year",
  "make",
  "model",
  "photoUrl"
) values (
  1,
  2011,
  'Toyota',
  'Prius',
  null
),
(
  1,
  2010,
  'Honda',
  'Civic',
  null
);

insert into "public"."records" (
  "vehicleId",
  "maintenanceName",
  "datePerformed",
  "mileage",
  "cost"
) values (
  1,
  'Oil change',
  '2022-02-26',
  199821,
  60
),
(
  1,
  'Tire rotation',
  '2022-02-26',
  199821,
  10
),
(
  1,
  'Gas',
  '2022-01-26',
  196833,
  60
),
(
  1,
  'New Engine',
  '2022-01-26',
  196833,
  3000
),
(
  1,
  'Hybrid Battery',
  '2022-01-26',
  196833,
  800
),
(
  1,
  'Blinker Fluid',
  '2021-12-20',
  194821,
  30
),
(
  1,
  'Tires',
  '2021-11-26',
  191821,
  400
),
(
  1,
  'Rims',
  '2021-11-26',
  191821,
  600
),
(
  1,
  'Oil change',
  '2021-9-26',
  186821,
  70
),
(
  1,
  'Oil change',
  '2021-08-26',
  180821,
  60
),
(
  1,
  'Oil change',
  '2021-07-26',
  17221,
  60
),
(
  1,
  'Car freshener',
  '2022-03-15',
  201922,
  5
),
(
  2,
  'Oil',
  '2021-12-30',
  126882,
  60
),
(
  2,
  'Tires',
  '2022-01-26',
  131922,
  400
),
(
  2,
  'Car freshener',
  '2022-03-01',
  140122,
  5
);

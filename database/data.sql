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
  'https://cdn.britannica.com/93/97093-050-23ACD82B/Prius-Toyota-1997.jpg'
),
(
  1,
  2010,
  'Honda',
  'Civic',
  'https://proximaride.com/images/car_placeholder2.png'
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

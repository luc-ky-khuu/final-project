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
  'https://proximaride.com/images/car_placeholder2.png'
)

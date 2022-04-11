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
  'https://www.vhv.rs/dpng/d/549-5490971_car-placeholder-image-png-transparent-png.png'
)

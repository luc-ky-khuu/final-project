set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."vehicles" (
	"vehicleId" serial NOT NULL,
	"userId" integer NOT NULL,
	"year" integer NOT NULL,
	"make" TEXT NOT NULL,
	"model" TEXT NOT NULL,
	"photoUrl" TEXT,
	CONSTRAINT "vehicles_pk" PRIMARY KEY ("vehicleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."records" (
	"vehicleId" integer NOT NULL,
	"maintenanceName" TEXT NOT NULL,
	"datePerformed" DATE NOT NULL,
	"mileage" integer NOT NULL,
	"cost" integer NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "records" ADD CONSTRAINT "records_fk0" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("vehicleId");

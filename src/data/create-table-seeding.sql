BEGIN;

DROP TABLE IF EXISTS "users";

CREATE TABLE "users"(
    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

COMMIT;
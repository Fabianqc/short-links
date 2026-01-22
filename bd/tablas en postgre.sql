-- 1. Crear Tipos ENUM (Postgres requiere definirlos antes)
DROP TYPE IF EXISTS "event_link_status";
CREATE TYPE "event_link_status" AS ENUM ('CREATED', 'UPDATED', 'DELETED');

DROP TYPE IF EXISTS "user_session_event";
CREATE TYPE "user_session_event" AS ENUM ('LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'SESSION_REFRESH', 'PASSWORD_RESET_REQUEST', 'PASSWORD_RESET_SUCCESS');

-- 2. Tablas

-- Tabla structure for table eventlink
DROP TABLE IF EXISTS "eventlink";
CREATE TABLE "eventlink" (
  "idEventLink" UUID NOT NULL,
  "ShortLinks_idShortLinks" UUID NOT NULL,
  "EventLinks" "event_link_status" NOT NULL,
  "Description" VARCHAR(255) NOT NULL,
  PRIMARY KEY ("idEventLink", "ShortLinks_idShortLinks")
);

-- Tabla structure for table eventusersession
DROP TABLE IF EXISTS "eventusersession";
CREATE TABLE "eventusersession" (
  "idEventUserSession" UUID NOT NULL,
  "Users_idUsers" UUID NOT NULL,
  "Event" "user_session_event" NOT NULL,
  "EventTime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("idEventUserSession", "Users_idUsers")
);

-- Tabla structure for table shortlinks
DROP TABLE IF EXISTS "shortlinks";
CREATE TABLE "shortlinks" (
  "idShortLinks" UUID NOT NULL,
  "OriginalLink" TEXT NOT NULL,
  "ShortLink" VARCHAR(45) NOT NULL,
  "CreateTime" TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY ("idShortLinks"),
  CONSTRAINT "ShortLink_UNIQUE" UNIQUE ("ShortLink")
);

-- Tabla structure for table statistics
DROP TABLE IF EXISTS "statistics";
CREATE TABLE "statistics" (
  "IdStatistics" UUID NOT NULL,
  "ShortLinks_idShortLinks" UUID NOT NULL,
  "HourTimestamp" TIMESTAMP NOT NULL,
  "ClicksCount" INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY ("IdStatistics", "ShortLinks_idShortLinks")
);

-- Tabla structure for table users
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "idUsers" UUID NOT NULL,
  "User" VARCHAR(255) DEFAULT NULL,
  "PassHash" BYTEA DEFAULT NULL,  -- Binary(64) se convierte a BYTEA
  "IdGoogle" VARCHAR(255) DEFAULT NULL,
  "Email" VARCHAR(255) NOT NULL,
  "Name" VARCHAR(255) DEFAULT NULL,
  "Create_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("idUsers"),
  CONSTRAINT "Email_UNIQUE" UNIQUE ("Email"),
  CONSTRAINT "User_UNIQUE" UNIQUE ("User"),
  CONSTRAINT "IdGoogle_UNIQUE" UNIQUE ("IdGoogle")
);

-- Tabla structure for table users_has_shortlinks
DROP TABLE IF EXISTS "users_has_shortlinks";
CREATE TABLE "users_has_shortlinks" (
  "Users_idUsers" UUID NOT NULL,
  "ShortLinks_idShortLinks" UUID NOT NULL,
  PRIMARY KEY ("Users_idUsers", "ShortLinks_idShortLinks")
);
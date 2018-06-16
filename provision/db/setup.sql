CREATE DATABASE foodtruck_radar;
CREATE DATABASE foodtruck_radar_test;

CREATE USER dev WITH ENCRYPTED PASSWORD 'dev' SUPERUSER;

GRANT ALL ON DATABASE foodtruck_radar TO dev;
GRANT ALL ON DATABASE foodtruck_radar_test TO dev;

\CONNECT foodtruck_radar;

CREATE SCHEMA foodtruck_radar;
GRANT ALL ON SCHEMA foodtruck_radar TO dev;

\CONNECT foodtruck_radar_test;

CREATE SCHEMA foodtruck_radar_test;
GRANT ALL ON SCHEMA foodtruck_radar_test TO dev;
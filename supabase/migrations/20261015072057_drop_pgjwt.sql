-- pgjwt is unused (no dependent objects or callers) and blocks the upgrade to Postgres 17
drop extension if exists pgjwt;

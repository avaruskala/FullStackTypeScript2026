#!/bin/bash

#-d \
exec podman run --name chap10-postgres \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=chap10db \
  -p 5432:5432 \
  "$@" \
  docker.io/postgres:18

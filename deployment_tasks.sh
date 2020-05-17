 #!/bin/bash

cd backend

echo collecting statics..

pipenv run python manage.py collectstatic --noinput

echo executing migrations..

pipenv run python manage.py migrate

cd $HOME

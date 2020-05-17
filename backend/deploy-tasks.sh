 #!/bin/bash

echo collecting statics..

pipenv run python manage.py collectstatic --noinput

echo statics collected.

echo executing migrations..

pipenv run python manage.py migrate

echo migrations executed.
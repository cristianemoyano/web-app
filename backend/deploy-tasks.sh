 #!/bin/bash

echo collecting statics..

python manage.py collectstatic --noinput

echo statics collected.

echo executing migrations..

python manage.py migrate

echo migrations executed.
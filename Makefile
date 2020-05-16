# APP

build:
	docker-compose build

prune:
	docker system prune

up:
	docker-compose up

# HEROKU

h-set:
	heroku git:remote -a $(app)

h-deploy:
	git push heroku master

h-stack:
	heroku stack:set container

# BACKEND APP

build-back:
	docker-compose build backend

back-new-app:
	docker-compose run --rm backend pipenv run python manage.py startapp $(app)

shell-back:
	docker-compose run --rm backend /bin/sh

run-back:
	docker-compose run --rm backend $(cmd)

back-migrate:
	docker-compose run --rm backend pipenv run python manage.py migrate

back-migrations:
	docker-compose run --rm backend pipenv run python manage.py makemigrations

back-superuser:
	docker-compose run --rm backend pipenv run python manage.py createsuperuser

back-up:
	docker-compose run --rm backend pipenv run python manage.py runserver 0.0.0.0:80000

# FRONTEND APP

shell-front:
	docker-compose run --rm frontend /bin/sh

build-front:
	docker-compose build frontend

run-front:
	docker-compose run --rm frontend $(cmd)

front-build:
	docker-compose run --rm frontend yarn build
	cp -r frontend/build backend/
	rm -rf frontend/build

front-add:
	docker-compose run --rm frontend npm add $(lib)
	docker-compose down
	docker-compose up --build
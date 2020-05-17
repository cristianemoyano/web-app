# APP

build:
	docker-compose build

prune:
	docker system prune

up:
	docker-compose up -d db backend frontend
	docker-compose logs -f

stop:
	docker-compose stop

# HEROKU

h-set:
	heroku git:remote -a $(app)

h-deploy:
	git push heroku master

h-stack:
	heroku stack:set container

h-config:
	heroku config:set DATABASE_URL=<config>

h-shell:
	heroku run bash
# BACKEND APP

back-build:
	docker-compose build backend

back-new-app:
	docker-compose run --rm backend pipenv run python manage.py startapp $(app)

back-shell:
	docker-compose run --rm backend /bin/sh

back-run:
	docker-compose run --rm backend $(cmd)

back-migrate:
	docker-compose run --rm backend pipenv run python manage.py migrate

back-migrations:
	docker-compose run --rm backend pipenv run python manage.py makemigrations

back-superuser:
	docker-compose run --rm backend pipenv run python manage.py createsuperuser

back-up:
	docker-compose run --rm backend pipenv run python manage.py runserver 0.0.0.0:80000 --settings=mysite.settings.dev

# FRONTEND APP

front-shell:
	docker-compose run --rm frontend /bin/sh

front-build:
	docker-compose build frontend

front-run:
	docker-compose run --rm frontend $(cmd)

front-build-assets:
	docker-compose run --rm frontend yarn build
	cp -r frontend/build backend/
	rm -rf frontend/build

front-add:
	docker-compose run --rm frontend npm add $(lib)
	docker-compose down
	docker-compose up --build

# PROD

prod-up:
	docker-compose up -d db prod
	docker-compose logs -f

prod-build:
	docker-compose build prod

prod-shell:
	docker-compose run --rm prod /bin/sh

prod-task:
	docker-compose run --rm prod ./deploy-tasks.sh

prod-req:
	docker-compose run --rm prod pipenv run pip freeze > requirements.txt
	cp -r ./requirements.txt backend/requirements.txt
	rm requirements.txt

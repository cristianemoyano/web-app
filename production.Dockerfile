FROM python:3.7

# Install curl, node, & yarn
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_8.x | bash \
  && apt-get install nodejs \
  && curl -o- -L https://yarnpkg.com/install.sh | bash \
  && pip install pipenv

WORKDIR /app/backend

# Install Python dependencies
COPY ./backend/Pipfile ./backend/Pipfile.lock /app/backend/
RUN pipenv install

# Install JS dependencies
WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/yarn.lock /app/frontend/
RUN $HOME/.yarn/bin/yarn install

# Add the rest of the code
COPY . /app/

# Build static files
RUN $HOME/.yarn/bin/yarn build

# Have to move all static files other than index.html to root/
# for whitenoise middleware
WORKDIR /app/frontend/build

# Moves static files
# from /app/frontend/build to /app/frontend/build/root, leaving index.html in place.
RUN mkdir root && mv *.ico *.js *.json root

WORKDIR /app

# Copy builded files
RUN cp -r frontend/build/root backend/

# Collect static files
RUN mkdir /app/backend/staticfiles

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN DJANGO_SETTINGS_MODULE=core.settings \
  SECRET_KEY=somethingsupersecret \
  python3 backend/manage.py collectstatic --noinput

EXPOSE $PORT

CMD python3 backend/manage.py runserver 0.0.0.0:$PORT

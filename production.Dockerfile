FROM python:3.7

# Install curl, node, & yarn
RUN apt-get -y install curl \
  && curl -sL https://deb.nodesource.com/setup_13.x | bash \
  && apt-get install nodejs \
  && curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /app/backend

# Install pipenv
RUN pip install pipenv

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

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DEBUG 0
ENV DJANGO_SETTINGS_MODULE core.settings.prod

# Copy builded files
RUN cp -r frontend/build/root backend/

# Collect static files
RUN mkdir /app/backend/staticfiles

WORKDIR /app/backend

EXPOSE $PORT

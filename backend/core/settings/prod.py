from .base import * # noqa

DEBUG = False

DATABASE_URL = str(os.getenv("DATABASE_URL"))

DATABASES = {
    'url': dj_database_url.parse(DATABASE_URL, conn_max_age=600),
}

DATABASES['default'] = DATABASES['url']

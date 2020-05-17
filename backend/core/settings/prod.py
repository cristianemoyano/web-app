from .base import * # noqa

DEBUG = False

DATABASES = {
    'url': dj_database_url.parse(str(os.getenv("DATABASE_URL")), conn_max_age=600),
}

DATABASES['default'] = DATABASES['url']

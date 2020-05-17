from .base import * # noqa

DEBUG = True

DATABASE_URL = str(os.getenv("DATABASE_URL"))

DATABASES = {
    'sqlite3': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'url': dj_database_url.parse(DATABASE_URL, conn_max_age=600),
}

DATABASES['default'] = DATABASES['url']

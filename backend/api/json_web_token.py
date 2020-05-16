from django.conf import settings
import jwt


class Secret(object):
    def __init__(self, token):
        self.token = token


def code_secrets():
	secrets = {
		'recaptcha_site_key': settings.RECAPTCHA_SITE_KEY,
	}
	token = jwt.encode(secrets, settings.RSA_PRIVATE_KEY, algorithm='RS256').decode('utf-8')
	return Secret(token=token)

def decode_secrets(secret):
	return jwt.decode(secret.token, settings.RSA_PUBLIC_KEY, algorithms=['RS256'])




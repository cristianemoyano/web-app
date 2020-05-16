from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient


class TestAccountsApi(TestCase):

    def setUp(self):
        self.api_client = APIClient()
        self.username = 'admin'
        self.password = '12345'
        self.user = User.objects.create(
            username=self.username,
            email='demo@demo.com',
        )
        self.user.set_password(self.password)
        self.user.save()

    def tearDown(self):
        self.api_client.credentials()
        self.api_client.logout()

    def test_register_user(self):
        request = self.api_client.post(
            '/api/auth/register',
            {
                'username': 'Cristian',
                'email': 'cris@email.com',
                'password': '1234',
            },
            format='json',
        )
        self.assertEqual(request.status_code, 200)

    def test_login_user_via_client(self):
        self.assertTrue(self.api_client.login(username=self.username, password=self.password))

    def test_login_user(self):
        request = self.api_client.post(
            '/api/auth/login',
            {
                'username': self.username,
                'password': self.password,
            },
            format='json',
        )
        self.assertEqual(request.status_code, 200)
        self.assertEqual(
            request.data.get('user'),
            {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email,
            },
        )

    def test_get_user_logged(self):
        self.api_client.force_authenticate(user=self.user)
        request = self.api_client.get('/api/auth/user')
        self.assertEqual(request.status_code, 200)
        self.assertEqual(
            request.data,
            {
                'id': self.user.id,
                'username': self.user.username,
                'email': self.user.email,
            },
        )

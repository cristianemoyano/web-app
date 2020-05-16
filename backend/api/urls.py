from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('todos', views.TodoViewSet, 'todos')
router.register('events', views.EventViewSet, 'todos')
router.register('lead', views.LeadListCreate, 'lead')
router.register('secrets', views.SecretViewSet, 'secrets')

# router.register('<The URL prefix>', <The viewset class>, '<The URL name>')

urlpatterns = router.urls

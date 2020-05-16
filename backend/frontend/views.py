from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.views.generic.detail import DetailView

from api.models import Todo

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


class TodoDetailView(DetailView):
    model = Todo
    template_name = 'index.html'

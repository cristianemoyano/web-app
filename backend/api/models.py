from django.db import models
from django.contrib.auth.models import User
from django_prometheus.models import ExportModelOperationsMixin


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


class Todo(ExportModelOperationsMixin('todo'), models.Model):
    """
    ExportModelOperationsMixin will export 3 metrics:

    - django_model_inserts_total{model="todo"}
    - django_model_updates_total{model="todo"}
    - django_model_deletes_total{model="todo"}.
    """

    task = models.CharField(max_length=255)
    owner = models.ForeignKey(
        User,
        related_name="todos",
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task


class Event(ExportModelOperationsMixin('event'), models.Model):
    """
    ExportModelOperationsMixin will export 3 metrics:

    - django_model_inserts_total{model="event"}
    - django_model_updates_total{model="event"}
    - django_model_deletes_total{model="event"}.
    """

    name = models.CharField(max_length=255)
    date = models.DateTimeField()
    time = models.DateTimeField()
    owner = models.ForeignKey(
        User,
        related_name="events",
        on_delete=models.CASCADE,
        null=True
    )
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

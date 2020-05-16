from rest_framework import serializers
from .models import Lead, Todo, Event


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'email', 'message')


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'


class EventSaveSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    time = serializers.TimeField()

    class Meta:
        model = Event
        fields = '__all__'

class SecretsSerializer(serializers.Serializer):
    token = serializers.CharField()

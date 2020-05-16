from .models import Lead
from .serializers import LeadSerializer, TodoSerializer, EventSerializer, SecretsSerializer
from rest_framework import viewsets, permissions
from .json_web_token import code_secrets
from rest_framework.response import Response


class LeadListCreate(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SecretViewSet(viewsets.ViewSet):

    def list(self, request):
        serializer = SecretsSerializer(code_secrets())
        return Response(serializer.data)


class EventViewSet(viewsets.ModelViewSet):
    """
    The ModelViewSet class inherits from GenericAPIView and includes implementations
    for various actions, by mixing in the behavior of the various mixin classes.

    The actions provided by the ModelViewSet class are
    .list(), .retrieve(), .create(), .update(), .partial_update(), and .destroy().

    def list(self, request):
        super(EventViewSet, self).list(request)
        pass

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.events.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    """
    The ModelViewSet class inherits from GenericAPIView and includes implementations
    for various actions, by mixing in the behavior of the various mixin classes.

    The actions provided by the ModelViewSet class are
    .list(), .retrieve(), .create(), .update(), .partial_update(), and .destroy().

    def list(self, request):
        super(EventViewSet, self).list(request)
        pass

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.events.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

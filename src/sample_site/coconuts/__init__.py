from tastypie.resources import ModelResource
from tastypie.authentication import Authentication
from tastypie.authorization import Authorization

from rest_api.apis import raw
from coconuts.models import CoconutEco

class CoconutEcoResource(ModelResource):
    class Meta:
        queryset = CoconutEco.objects.all()
        authentication = Authentication()
        authorization = Authorization()

raw.api.register(CoconutEcoResource())

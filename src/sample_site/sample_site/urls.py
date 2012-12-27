from django.conf import settings
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib.staticfiles.views import serve
from django.views.decorators.cache import never_cache

from rest_api.apis import raw

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'sample_site.views.home', name='home'),
    # url(r'^sample_site/', include('sample_site.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(raw.api.urls)),
    url(r'^$', TemplateView.as_view(template_name="home.html"), {}, 'home'),

    url(r'^'+settings.STATIC_URL[1:]+'(?P<path>.*)$', never_cache('django.contrib.staticfiles.views.serve')),
)

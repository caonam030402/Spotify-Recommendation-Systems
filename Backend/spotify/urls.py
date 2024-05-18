from django.urls import path
from spotify.views import (
    recommend_based_on_search_query_endpoint,
    recommend_from_playlist,
)
from . import views

urlpatterns = [
    path(
        "recommend_from_playlist/",
        views.recommend_from_playlist,
        name="recommend_from_playlist",
    ),
    path(
        "recommend_based_on_search_query/",
        views.recommend_based_on_search_query_endpoint,
        name="recommend_based_on_search_query",
    ),
]

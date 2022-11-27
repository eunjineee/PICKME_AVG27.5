from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('', views.movie_list),
    path('<int:movie_pk>/review/', views.review_list_create),
    path('<int:movie_pk>/review/<int:review_pk>/', views.review_detail),
    path('<int:movie_pk>/review/<int:review_pk>/like/', views.review_like),
    path('<int:movie_pk>/wishmovies/', views.wish_movies),
    path('<int:movie_pk>/pickmovies/', views.pick_movies),
    path('recommended/<str:mbti>/', views.recommended_mbti),
    path('recommended/age/<int:age>/', views.recommended_age),
]


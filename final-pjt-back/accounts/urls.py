from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('profile/search/<int:user_pk>/', views.usersearch,),
    path('profile/<str:username>/', views.profile_or_edit, name='profile'),
    path('<str:username>/follow/', views.follow, name='follow'),
    path('users/', views.users, name='users'),
]
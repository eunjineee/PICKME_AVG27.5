from django.db import models
from django.conf import settings
# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=15)

class Movie(models.Model):
    title = models.CharField(max_length=50)
    overview = models.TextField()
    poster_path = models.TextField()
    vote_average = models.FloatField()
    release_date = models.CharField(max_length=50)
    genres = models.ManyToManyField(Genre, related_name="movie_genres")                                      #장르와 영화 관계 설정
    wishuser = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='wishmovies', blank=True)
    pickuser = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='pickmovies', blank=True)


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    content = models.TextField()        
    vote_average = models.FloatField()      
    liked_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_reviews', blank=True)                                                                 #개인 영화 평점
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
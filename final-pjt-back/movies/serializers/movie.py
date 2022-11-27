from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import Movie, Review

class MovieListSerializer(serializers.ModelSerializer):
    class ReviewSerializer(serializers.ModelSerializer):
        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = get_user_model()
                fields = ('pk', 'username')
        user = UserSerializer(read_only=True)
        class Meta:
            model = Review
            fields = ('id', 'movie', 'user', 'content', 'vote_average','created_at', 'updated_at', 'liked_users',)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = ('id','title','overview','poster_path','vote_average','release_date','genres','reviews','wishuser','pickuser') 

class MovieSerializer(serializers.ModelSerializer):
    class ReviewSerializer(serializers.ModelSerializer):
        class UserSerializer(serializers.ModelSerializer):
            class Meta:
                model = get_user_model()
                fields = ('pk', 'username')
        user = UserSerializer(read_only=True)
        class Meta:
            model = Review
            fields = ('id', 'movie', 'user', 'content', 'vote_average','created_at', 'updated_at', 'liked_users',)
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = ('id', 'title', 'overview', 'poster_path', 'vote_average', 'release_date', 'genres', 'reviews','wishuser','pickuser')


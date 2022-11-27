from rest_framework import serializers
from django.contrib.auth import get_user_model

from ..models import Review

class ReviewListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('pk', 'username', 'nickname')
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'movie', 'user', 'content', 'vote_average','created_at', 'updated_at', 'liked_users',)
        # read_only_fields = ('movie')


class ReviewSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('pk', 'username', 'nickname')
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'movie', 'user', 'content', 'vote_average','created_at', 'updated_at', 'liked_users')
        # read_only_fields = ('movie')


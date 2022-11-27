from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    nickname = models.CharField(max_length=15, blank=False, null=False)
    age = models.IntegerField(default=20)
    mbti = models.CharField(max_length=10)
    profile_img = models.TextField(default='https://assets.repress.co.kr/photos/2009ea104d2c842fed5461308d9f92d7/original.jpg', blank=True)


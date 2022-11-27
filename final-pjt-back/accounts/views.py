from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET', 'PUT'])
def profile_or_edit(request, username):
    user = get_object_or_404(get_user_model(), username=username)
    if request.method == 'GET':
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    
    elif request.user.is_authenticated:
        serializer = ProfileSerializer(data=request.data, instance=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET','POST'])
def follow(request, username):
    you = get_object_or_404(get_user_model(), username=username)
    me = request.user
    if request.method == 'GET':
        if me in you.followers.all():
            follow = True
        else:
            follow = False
        return Response(follow)
    else:
        if you.followers.filter(username=me).exists():
            # 언팔로우
            print('unfollow')
            you.followers.remove(me)
            follow = False
            return Response(follow)
        else:
            # 팔로우
            print('follow로 들어옴')
            you.followers.add(me)
            follow = True
            return Response(follow)

@api_view(['GET'])
def users(request):
    users = get_list_or_404(get_user_model())
    serializer = ProfileSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT'])
def usersearch(request, user_pk):
    user = get_object_or_404(get_user_model(), id=user_pk)
    if request.method == 'GET':
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    
    elif request.user.is_authenticated:
        serializer = ProfileSerializer(data=request.data, instance=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
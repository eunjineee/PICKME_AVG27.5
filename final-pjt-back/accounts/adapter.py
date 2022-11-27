import json
from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        user = super().save_user(request, user, form, False)
        profile_img = data.get("profile_img")
        nickname = data.get("nickname")
        age = data.get("age")
        mbti = data.get("mbti")
        # genre_likes = data.get("genre_likes")
        if profile_img:
            user.profile_img = profile_img
        # if genre_likes:
        #     user.genre_likes = genre_likes
        if nickname:
            user.nickname = nickname
        if age:
            user.age = age
        if mbti:
            user.mbti = mbti
        user.save()
        return user
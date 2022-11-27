<template>
  <div>
    <div class="mainitem-blank-height"></div>
    <div style="display:flex;">
      <!-- 1번 -->
      <div style="width:100px;"></div>
      <!-- 1번 부속 -->
      <div style="width:400px;">
        <div class="profile-blank-height"></div>
        <h1 style="margin-left:20px;">프로필</h1>
        <div>
          <div>
            <!-- {{profileuser}} -->
            <div class="imgbox">
              <img
              class="profile"
              :src="profileuser.profile_img ? profileuser.profile_img : '@/assets/noimage.png'"
              alt="프로필 사진을 등록해주세요."
              />
            </div>
          </div>
          <div style="width:90px;"></div>
          <div style="font-size:large; margin:10px;">
            <div style="margin:10px;">
              이름 : {{profileuser.nickname}}
            </div>
            <div style="margin:10px;">
              나이 : {{profileuser.age}} 
            </div>
            <div style="margin:10px;">
              mbti : {{profileuser.mbti}}
            </div>
            <div style="margin:10px;">  
              <span @click="followerclick" class="putmouse"> followers : {{ followers_count }} </span>
              <span @click="followingclick" class="putmouse">  followings : {{ followings_count }}</span>
            </div>
            <div>
              <h3 class="articleTitle"></h3>
              <div v-if="samePeople">
                <router-link
                :to="{
                  name: 'ProfileEditView',
                  params: {
                    username: user.username,
                  },
                }"
                ><span class="button btnPush btnBlueGreen">EDIT PROFILE</span></router-link></div>
              <div v-else @click="followPut()">
              <!-- v-else -->
                <div v-if="follow" @click="postfollow"><span class="button btnPush btnBlueGreen">UNFOLLOW</span></div>
                <div v-else @click="postfollow"><span class="button btnPush btnBlueGreen">FOLLOW</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 2번 -->
      <div>
        <div>
          <div class="profile-blank-height"></div>
          <p style="font-size:x-large"><span @click="pickclick" class="putmouse">PICK :</span>{{ pickmovies_count }}  | 
          <span @click="wishclick" class="putmouse">Wish :</span>{{ wishmovies_count }} </p> 
        </div>
        <!-- 1일때 -->
        <div v-if="btn===1">
          <h1>{{profileuser.nickname}}님의 PICK</h1>
          <div class="mainitem">
            <MovieCardListItem2
              v-for="movie in profileuser.pickmovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
        <!-- 4일때 -->
        <div v-if="btn===4">
          <h1>{{profileuser.nickname}}님의 WISH</h1>
          <div class="mainitem">
            <MovieCardListItem2
              v-for="movie in profileuser.wishmovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
        <div>
          <!-- 2일때 -->
          <div v-if="btn===2">
            <h1>followers</h1>
            <ProfileMini
              v-for="people in profileuser.followers"
              :key="people.id"
              :people="people"
            />
          </div>
          <!-- 3일때 -->
          <div v-if="btn===3">
            <h1>followings</h1>
            <ProfileMini
              v-for="people in profileuser.followings"
              :key="people.id"
              :people="people"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import MovieCardListItem2 from '@/components/movies/MovieCardListItem2'
import ProfileMini from '@/components/profiles/ProfileMini'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'
export default {
  name: 'ProfileView',
  components: {
    ProfileMini,
    MovieCardListItem2,
  },
  data() {
    return {
      follow: false,
      profileuser: {},
      btn: 1,
    }
  },
  computed: {
    isLogin() {
      return this.$store.gatters.isLogin
    },
    user() {
      return this.$store.state.user
    },
    samePeople() {
      return this.$route.params.username === this.user.username
    },
    followers_count() {
      return this.profileuser?.followers.length;
    },
    followings_count() {
      return this.profileuser?.followings.length;
    },
    pickmovies_count() {
      return this.profileuser?.pickmovies.length;
    },
    wishmovies_count() {
      return this.profileuser?.wishmovies.length;
    }
  },
  created() {
    // console.log( this.$route.params.username)
    const payload = { username: this.$route.params.username }
    this.getProfileData(payload)
    this.followCheck(payload)
  },
  methods: {
    getProfileData(payload) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${payload.username}/`,
      })
        .then((res) => {
          this.profileuser = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    followPut() {
      this.$store.dispatch('followPut',this.profileuser.username)
    },
    followCheck(payload) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/${payload.username}/follow/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.follow = res.data
      })
    },
    postfollow() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/${this.$route.params.username}/follow/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.follow = res.data
          const payload = { username: this.$route.params.username }
          this.getProfileData(payload)
          
      })
    },
    pickclick() {
      this.btn = 1
    },
    wishclick() {
      this.btn = 4
    },
    followerclick() {
      this.btn = 2
    },
    followingclick() {
      this.btn = 3
    }
  },
}
</script>

<style>
.imgbox {
  width: 150px;
  height: 150px; 
  border-radius: 70%;
  overflow: hidden;
}

.profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-blank-height {
  height: 200px;
}
span.button {
  display: block;
  position: relative;
  float: left;
  width: 200px;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: #FFF;
  border-radius: 5px;
  transition: all 0.2s ;
}
.btnBlueGreen.btnPush {
  box-shadow: 0px 5px 0px 0px #007144;
}
.btnPush:hover {
  margin-top: 15px;
  margin-bottom: 5px;
}
.btnBlueGreen {
  background: #00AE68;
}
.btnBlueGreen.btnPush:hover {
  box-shadow: 0px 0px 0px 0px #007144;
}
</style>

<template>
  <div class="bv-example-row allfont">
    <b-row>
      <b-col xs="4" md="3" lg="2" sm="6">
        <div id='nav' class="text-center">
          <nav class="navbar">
            <ul id='home-ul' class="nav">
              <li class="nav-item">
                <img class="nav-button-img" src="@/assets/PICME2.png" alt="">
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-button button--winona" data-text="Go Movie" :to="{ name: 'MovieView' }">
                  <span>홈</span></router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link nav-button button--winona" data-text="Go Article" :to="{ name: 'ArticleView' }">
                  <span>게시판</span></router-link>
              </li>
              <li v-if="isLogin">
                <router-link class="nav-link nav-button button--winona" data-text="Go Profile" :to="{ name: 'ProfileView', params: { username: username } }" v-if="isLogin">
                  <span>{{ nickname }}</span></router-link>
              </li>
              <li>
                <router-link class="nav-link nav-button button--winona" data-text="Go Sign Up" :to="{ name: 'LogInView' }" v-if="!isLogin">
                  <span>로그인</span></router-link>
                <div class="nav-link nav-button button--winona" data-text="Go Log In" @click="isLogOut" v-if="isLogin">
                  <span>로그아웃</span>
                </div>
              </li>
              <li class="nav-item" v-if="!isLogin">
                <router-link class="nav-link nav-button button--winona" data-text="Go Sign Up" :to="{ name: 'SignUpView' }">
                  <span>회원가입</span></router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="nav-space"></div>
      </b-col>
      <b-col xs="8" md="9" lg="10" sm="6">
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'HomeView',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
      },
    username() {
      return this.$store.state.username
    },
    nickname() {
      return this.$store.state.user.nickname
    }
  },
  created() {
    this.getmoviedata()
    this.getmovielatest()
  },
  methods: {
    getmoviedata() {
      const movie_length_latest = this.$store.movie_latest
      if (movie_length_latest === undefined) {
      const movie_length = this.$store.movies
      console.log(movie_length)
      axios.get(`${API_URL}/movies`)
        .then((res) => {
          this.$store.dispatch('getMovieData', res.data)
        })
        .catch((err) => { 
          console.log(err)
        })}
    },
    getmovielatest() {
      const movie_length = this.$store.movie_latest
      if (movie_length === undefined) {
      this.$store.dispatch('getMovieLatest')
      }
    },
    isLogOut(){
      this.$store.dispatch('logOut',this.isLogin)
    }
  },
}
</script>

<style>
/* nav바 가로 */
#nav {
  background-color: #121111;
  min-height: 1000px;
  height: 1500px;
}
#home-ul>li {
  width:100%;
  margin:0 auto;
  padding: 10%;
  flex-direction:column;
  font-size:x-large;
  justify-content: space-around
}
li>img {
  width:100px;
}
#nav-space {
  height: 90%;
}
.nav-button {
  min-width: 150px;
  max-width: 350px;
  display: block;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: none;
  background: none;
  color: inherit;
  position: relative;
  z-index: 1;
  -moz-osx-font-smoothing: grayscale;
}
.nav-button-img {
  min-width: 200px;
  max-width: 420px;
  display: block;
  border: none;
  background: none;
  color: inherit;
  position: relative;
  z-index: 1;
  margin: 0 auto; 
  padding: 0;
  -moz-osx-font-smoothing: grayscale;
}
.button--winona {
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
  -webkit-transition: border-color 0.3s;
  transition: border-color 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  border: 1px solid;
  border-radius: 3px;
}
.button--winona::after {
  content: attr(data-text);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  color: #3f51b5;
  -webkit-transform: translate3d(0, 25%, 0);
  transform: translate3d(0, 25%, 0);
}
.button--winona > span {
  display: block;
}
.button--winona:hover {
  margin: 0 auto;
  border-color: #3f51b5;
  background-color: rgba(63, 81, 181, 0.1);
}
.button--winona:hover::after {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.button--winona:hover > span {
  opacity: 0;
  -webkit-transform: translate3d(0, -25%, 0);
  transform: translate3d(0, -25%, 0);
}
</style>
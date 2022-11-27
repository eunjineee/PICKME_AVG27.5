import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)


const API_URL = 'http://127.0.0.1:8000'

const MOVIE_API_KEY = process.env.VUE_APP_MOVIE_API_KEY
// const MOVIE_API_KEY = '859b52ab552de5015f0e7dbaa748474e'
const LATEST_API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${MOVIE_API_KEY}&language=ko-kr&page=1`


export default new Vuex.Store({
  plugins: [
    createPersistedState() // 계산 된 값을 유지
  ],
  state: {
    articles: [],
    movies: [],
    movie_latest: [],
    movie_mbti: [],
    movie_age: [],
    users:[],
    ////////////////////////////////////////accounts//////////////
    token: null,
    username: null,
    user: {mbti: 'INFP', age: '20'},// user.pk
    profileuser: {},
    mbti: '',
  },
  getters: {
    ////////////////////////////////////////accounts//////////////
    isLogin(state) {
      return state.token ? true : false //로그인 상태면 true 아니면 false
    },
  },
  mutations: {
    MOVIE_DATA(state, moviedata) {
      state.movies = moviedata
    },
    MOVIE_LATEST(state, moviedata) {
      state.movie_latest = []
      state.movie_latest = moviedata
      moviedata.forEach(movie => {
        const movie_g = {
          id: movie.id,
          title: movie.title,
          genre_ids: movie.genre_ids,
          poster_path: movie.poster_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
        }
        state.movies.push(movie_g)
    })},
    MOVIE_MBTI(state, movie_mbti) {
      state.movie_mbti = []
      state.movie_mbti = movie_mbti
    },
    MOVIE_AGE(state, movie_age) {
      state.movie_age = []
      state.movie_age = movie_age
    },
    ////////////////////////////////////////accounts//////////////
    SIGN_UP(state, token) {
      state.token = token
    },
    GET_ARTICLES(state, articles) {
      state.articles = articles
      this.$router.push({ name: 'ArticleView' })
    },
    // 회원가입 && 로그인
    SAVE_TOKEN(state, token) {
      state.token = token
    },
    LOG_OUT(state) {
      state.token = null
      state.user = {}
      state.username = null
    },
    UPDATE_USER(state, username) {
      state.username = username
    },
    GET_USERNAME(state, username) {
      state.username = username
      router.push({ name: 'MovieView' })
    },
    GET_NOW_USER(state, payload) {
      // console.log(payload)
      state.user = payload
    },
    GET_PROFILE_USER(state, payload) {
      // console.log(payload)
      state.profileuser = payload
    },

    ////////////////////////////////////////articles//////////////
    ARTICLE_DELETE(state, article_id) {
      state.articles = state.articles.filter((article) => {
        return !(article.id === article_id)
      })
    },
  },
  actions: {
    getArticles(context) {
      console.log('ddd')
      axios({
        method: 'get',
        url: `${API_URL}/articles/article/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data)
          
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMovieData(context, moviedata) {
      context.commit('MOVIE_DATA', moviedata)
    },
    getMovieLatest(context){
      axios({
        method: 'get',
        url: `${LATEST_API_URL}`,
      })
        .then((res) => {
          context.commit('MOVIE_LATEST', res.data.results)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getMovieMbti(context, mbti) {
      axios.get(`${API_URL}/movies/recommended/${mbti}`)
        .then((res) => {
          context.commit('MOVIE_MBTI', res.data)
        })
        .catch((err) => { 
          console.log(err)
      })
    },
    getMovieage(context, age) {
      axios.get(`${API_URL}/movies/recommended/age/${age}`)
        .then((res) => {
          context.commit('MOVIE_AGE', res.data)
        })
        .catch((err) => { 
          console.log(err)
      })
    },
    ////////////////////////////////////////accounts//////////////
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: payload
      })
        .then(() => {
          // console.log(res.data)
          context.dispatch('getUsername', payload.username)
          router.push({ name: 'LogInView' })
        })
        .catch(() => {
          alert('양식에 맞지 않습니다.')
        })
    },
    profileEdit(context, payload) {
      const username = payload.username
      axios({
        method: 'put',
        url: `${API_URL}/accounts/profile/${username}/`,
        data: payload,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(() => {
          context.dispatch('getNowUser',username)
          router.push({name:'MovieView'})
        })
    },
    logIn(context, payload) {
      // console.log(payload)
      const username = payload.username
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: payload
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('SAVE_TOKEN', res.data.key)
          context.commit('GET_USERNAME', username)
          context.dispatch('getNowUser',username)
        })
        .catch(() => {
          alert('다시 로그인을 시도해 주세요.') 
      })
    },
    getNowUser(context,username) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${username}/`,
      })
        .then((res) => {
          // console.log(res.data)
          context.commit('GET_NOW_USER', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProfileUser(context,payload) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/profile/${payload.username}/`,
      })
        .then((res) => {
          context.commit('GET_PROFILE_USER', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logOut(context, islogin) {
      if (islogin) {
        context.commit('LOG_OUT')
        router.push({ name: 'MovieView' })
      } else {
        alert('로그인 해주세요')
        router.push({ name: 'MovieView' })
      }
    },
    followPut(context, follow_username){
      axios({
        method: 'post',
        url: `${API_URL}/accounts/${follow_username}/follow/`,
        headers: {
          Authorization: `Token ${context.state.token}`},
      })
      .then((res) => {
          console.log(res)
      })
    },
    ////////////////////////////////////////articles//////////////
    ArticleDelete(context, article_id) {
      context.commit('ARTICLE_DELETE', article_id)
    },
  },
  modules: {
  }
})

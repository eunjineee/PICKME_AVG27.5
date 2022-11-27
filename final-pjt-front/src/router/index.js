import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/articles/ArticleView'
import CreateView from '@/views/articles/CreateView'
import DetailView from '@/views/articles/DetailView'
import EditView from '@/views/articles/EditView'

import SignUpView from '@/views/accounts/SignUpView'
import LogInView from '@/views/accounts/LogInView'
import ProfileView from '@/views/accounts/ProfileView'
import ProfileEditView from '@/views/accounts/ProfileEditView'
import ProfileMiniView from '@/views/accounts/ProfileMiniView'

import MovieView from '@/views/movies/MovieView'
import MovieDetailView from '@/views/movies/MovieDetailView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ArticleView',
    component: ArticleView
  },
  
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  
  {
    path: '/article/:id',
    name: 'DetailView',
    component: DetailView,
  },

  {
    path: '/edit',
    name: 'EditView',
    component: EditView
  },
  
  ////////////////////////////////////////////////
  
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  
  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/profile/edit/:username',
    name: 'ProfileEditView',
    component: ProfileEditView
  },
  
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView
  },

  {
    path: '/profilemini/:username',
    name: 'ProfileMiniView',
    component: ProfileMiniView
  },

  ///////////////////////////////////////////////////

  {
    path: '/movies',
    name: 'MovieView',
    component: MovieView,
  },

  {
    path: '/movies/:id',
    name: 'MovieDetailView',
    component: MovieDetailView,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = true
//   const authPages = ['']
//   const isAuthRequired = authPages.includes(to.name)
//   // 로그인이 필요한 페이지이고, 로그인 되어있지 않으면 로그인 페이지로 이동
//   // 그렇지 않으면 기존 루트로 이동
//   if (isAuthRequired && !isLoggedIn) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
//   // 또는 로그인하지 않아도 되는 페이지만 모을 수도 있음.
//   // const allowAllPages = ['login']
//   // const isAuthRequired = !allowAllPages.includes(to.name)
// })


export default router

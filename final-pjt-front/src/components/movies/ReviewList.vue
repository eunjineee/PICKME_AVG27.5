<template>
  <div>
    <hr>
    <review-list-item class="container"
      v-for="review in reviews"
      :key="review.id"
      :review="review"
      @deleteReview="deleteReview"
    >

    </review-list-item>

    <b-form-rating v-model="vote_average" variant="warning" class="mb-2"></b-form-rating>
    <textarea v-model="content" class="form-control" placeholder="리뷰를 남겨보세요." rows="5"></textarea>
    <div class="d-flex justify-content-end my-2">
      <button @click="createReview" class="btn btn-success">등록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewListItem from '@/components/movies/ReviewListItem'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ReviewList',
  components: {
    ReviewListItem,
  },
  props: {
    movieId: [String, Number],
  },
  data: function () {
    return {
      reviews: [],
      review: null,
      content: null,
      vote_average: null,
      reviewId : null,
    }
  },
  created(){
    this.reviewlist()
  },
  computed: {
    user() {
      return this.$store.state.user.pk
    }
  },
  methods: {
    reviewlist(){
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.movieId}/review/`,
        headers: {Authorization: `Token ${this.$store.state.token}`}
      })
        .then((res) => {
          this.reviews = res.data 
        })
        .catch((err) => {
          console.log(err)
        })
      },
    createReview: function () {
      const content = this.content
      const movie = this.movieId
      const user = this.user
      const vote_average = this.vote_average
      
      if (!vote_average) {
        alert('점수를 지정해주세요')
        return
      } else if (!content) {
        alert('내용을 입력해주세요')
        return
      }
      axios({
        method: 'post',
        url: `${API_URL}/movies/${this.movieId}/review/`,
        data: {
          content: content,
          movie: movie,
          user: user,
          vote_average: vote_average,
        },
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.content = null
          this.review = res.data
          this.reviews.push(this.review)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteReview(reviewId){
      axios({
          method: 'delete',
          url: `${API_URL}/movies/${this.movieId}/review/${reviewId}/`,
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          }
        })
          .then((res) => {
            this.reviews = res.data 
          })
          .catch(() => {
            this.reviews = []
          })
    }
  },
}
</script>

<style>

</style>
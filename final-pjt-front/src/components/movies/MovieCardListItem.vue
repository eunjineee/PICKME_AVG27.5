<template>
  <div>
    <div class="card mb-3 main-row card-row-backgroud" style="max-width: 540px;" @click="movieDetail(movie.id)">
      <div class="row g-0">
        <div class="col-md-1">
          <img :src="imgUrl" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-11">
          <div class="card-body pt-1 pl-5 card-font-l">
            <p class="card-title putmouse">{{ movieTitle }}</p>
            <p class="card-text">⭐: {{ vote_average }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
export default {
  name: 'MovieCardListItem',
  props: {
    movie : Object,
  },
  computed: {
    imgUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
    },
    movieTitle() {
      return this.movie.title
    },
    movieDesc() {
      return this.movie.overview
    },
    vote_average() {
      return this.movie.vote_average
    }
  },
  methods: {
    movieDetail(id) {
      this.$router.push({ name: 'MovieDetailView', params: {id}})
    }
  }
}
</script>

<style>
.card-row-backgroud {
  background-color: #232323 !important;
  outline: 0 !important;
  border: 0 !important;
}
.card-font-l {
  font-size: 17px !important;
}
</style>
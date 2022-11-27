<template>
  <div class="call" ontouchstart="this.classList.toggle('hover');">
    <div class="container" @click="movieDetail(movie.id)">
      <div class="front" style="background-image: url(https://unsplash.it/500/500/)">
        <img :src="imgUrl" alt="" style="width:150px;">
      </div>
      <div class="back">
        <div class="inner">
          <p  width='100px' style="word-break:break-all">{{ movieTitle }}</p>
          <span>⭐: {{ vote_average }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MovieCardListItem2',
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
.card-margin {
  margin: 10px;
}
.call {
  cursor: pointer;
}
.container{
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
	-webkit-perspective: 1100px;
  perspective: 1100px;
}

.front,
.back{
  background-size: cover;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.25);
  border-radius: 10px;
	background-position: center;
	-webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	-o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
	-webkit-backface-visibility: hidden;
  backface-visibility: hidden;
	text-align: center;
	min-height: 220px;
	height: auto;
	border-radius: 10px;
	color: #fff;
	font-size: 1rem;
}

.back{
  background: #cedce7;
  background: -webkit-linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
  background: -o-linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
  background: linear-gradient(45deg,  #cedce7 0%,#596a72 100%);
}

.front:after{
	position: absolute;
  z-index: 1;
  content: '';
  display: block;
  opacity: .6;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
}
.container:hover .front,
.container:hover .back{
  -webkit-transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1), -webkit-transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.inner{
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 1rem;
  padding: 2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
}

.container .back{
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container .front{
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);   
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .back{
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.container:hover .front{
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.front .inner p{
  font-size: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.front .inner p:after{
  content: '';
  width: 2rem;
  height: 1px;
  position: absolute;
  background: #C6D4DF;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -.75rem;
}

.front .inner span{
  color: rgba(255,255,255,0.7);
  font-family: 'Montserrat';
  font-weight: 150;
}

</style>
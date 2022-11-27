<template>
  <div class="video-wrap">
    <div  v-if="mainData !== null"></div>
      <div class="d-flex justify-content-center video-container">
        <iframe id="video" type="text/html" width="640" height="360"
          :src="`http://www.youtube.com/embed/${mainData}?enablejsapi=1&origin=http://example.com&mute=1&autoplay=1`"
          frameborder="0"
        ></iframe>
    </div>
  </div>
</template>
    
    
    
<script>
import axios from 'axios'
const API_KEY = process.env.VUE_APP_API_KEY


export default {
name : 'YoutubeCard',
data() {
  return {
  mainData: null,
  }
},
props: {
  movie_title: String,
},
created() {
  this.movieSerch()
},
methods: {
  movieSerch() {
  const movie_search = this.movie_title + ' 예고편'
  const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${movie_search}`
  axios({
    method: 'get',
    url: API_URL
  })
  .then((response) => {
    this.mainData = response.data.items[0].id.videoId
    console.log(response.data.items)
  })
  .catch((error) => {
    console.log(error)
  })
  },
}
}
</script>

<style>
.video-wrap {position:relative; padding-bottom:56.25%; padding-top:30px; height:0; overflow:hidden;}
.video-wrap iframe,
.video-wrap object,
.video-wrap embed {position:absolute; top:0; left:0; width:100%; height:100%;}
</style>
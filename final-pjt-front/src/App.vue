<template>
  <div id="app">
    <HomeView/>
  </div>
</template>

<script>
import HomeView from '@/views/HomeView'

export default {
  name: 'app',
  components: {
    HomeView
  },
  created() {
    this.$router.push({name: 'MovieView'})
  }
}

</script>
<style>
#app {
  background-color: #232323;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

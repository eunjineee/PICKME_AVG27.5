<template>
  <div>
    <h1>숑~~</h1>
  </div>
</template>

<script>

export default {
  name: 'ProfileMiniView',
  data() {
    return {
      person : null,
    }
  },
  created() {
    this.username = this.$route.params.username
    console.log('여기는 숑 ',this.username)
    setTimeout(() => this.gogo(), 1000)
  },
  methods: {
    gogo() {
      this.$router.push({ name: 'ProfileView' , params:{ username : this.username }})
    }
  }
}
</script>

<style>

</style>
<template>
  <div id="app">
    <Subscription/>
  </div>
</template>

<script>
  import Subscription from './components/Subscription.vue'

  export default {
    name: 'app',
    components: {
      Subscription
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>

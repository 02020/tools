<template>
  <div id="app">

    <div style="height:100px;width:100px"
         @click="handleClick"> ddd </div>
    <Home />
  </div>
</template>
<script>
import Home from './components/Home.vue';
 
export default {
  name: 'app',
  components: {
    Home
  },
  methods: {
    handleClick () {
     
    }
  },
  mounted () {
    console.log('mounted app');
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

  height: 600px;
  width: 600px;
}

#Home {
  height: 600px;
  width: 600px;
}
</style>
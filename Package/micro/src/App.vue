<template>
  <div id="app">

    <div style="height:100px;width:100px"
         @click="handleClick"> ddd </div>
    <Home />
  </div>
</template>
<script>
import actions from './micro/shared/actions'

import Home from './components/Home.vue';
// import "calcite-maps/lib/js/dojo-bootstrap/Dropdown";
//require("../dojo/Dropdown.js");
export default {
  name: 'app',
  components: {
    Home
  },
  methods: {
    handleClick () {
      const token = 'asdasdddd>>>' + +new Date()
      console.log('组件通讯-事件发分发', token)
      // 登录成功后，设置 token
      actions.setGlobalState({ token })
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
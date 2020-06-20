<template>
  <div>   
    <HelloWorld msg="Test" />
    <v-test>sss</v-test>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import vTest from './test/test.vue'


export default {
  name: 'App',
  components: {
    HelloWorld, vTest
  }
}
</script>

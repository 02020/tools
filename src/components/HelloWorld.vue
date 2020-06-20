<template>
  <div>

    <h1>{{ msg }}</h1>
    <button @click="handle">count is: {{ count }}</button>
    <p>Edit Test
      <code>components/HelloWorld.vue</code>
      to test hot module replacement.</p>
    <!-- <Scrollbar :noresize=false
               warp-style="max-height:200px"> -->
    <div v-for="item in 10"
         :key="item">{{item}}</div>

    <!-- </Scrollbar> -->
  </div>

</template>
<script>
import { createApp, ref, h } from 'vue'

export default {
  name: 'HelloWorld',
  components: {

  },
  props: {
    msg: String
  },
  render () {
    const bar = {
      key: 1,

    }
    return h('div', {
      class: ['el-scrollbar__bar', 'is-' + bar.key]

    }, 'ddddddd')
  },


  data () {
    return {
      count: 0
    }
  },
  methods: {
    clickThumbHandler () {

    },
    handle () {


    }
  }
}
/*

<template>
  <div>

    <h1>{{ msg }}</h1>
    <button @click="handle">count is: {{ count }}</button>
    <p>Edit Test
      <code>components/HelloWorld.vue</code>
      to test hot module replacement.</p>
    <!-- <Scrollbar :noresize=false
               warp-style="max-height:200px"> -->
      <div v-for="item in 100"
           :key="item">{{item}}</div>

    <!-- </Scrollbar> -->
  </div>

</template>


*/
</script>

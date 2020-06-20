<template>
  <label>
    <input :disabled="disabled" type="text" v-model="checkbox">
    <slot>
      <slot>
  </label>
</template>

<script>
/**
 * 一个简单的Vue插件
 * @module checkbox
 */
export default {
  name: "checkbox",
  /**
   * Props 接受父组件的传值
   * @prop {Array} model 必传参数
   * @prop {Boolen} disabled 控制显示
   */
  props: {
    model: {
      type: Array,
      required: true,
      twoWay: true
    },
    disabled: Boolean
  },
  /**
   * Components 包含子组件
   * @prop {Component} component 子组件1说明
   */
  components: {},
  methods: {
    /**
     * @function showMsg
     * @param {String} msg 需要打印的消息
     */
    showMsg: function(msg) {
      console.log(msg);
    }
  }
};
</script>

<style lang="css" scoped>

</style>
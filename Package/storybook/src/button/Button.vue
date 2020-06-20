<template>
  <div class="button" :class="`size-${size}`">
    <!-- @slot 插件的注释 -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ButtonSize } from './types';

/**
 * 这是组件的注释
 **/
@Component
export default class Button extends Vue {
  /**
   * 属性的注释- 大小
   */
  @Prop({ type: String, default: 'small' }) readonly size!: ButtonSize;

  /**
   * 属性的注释- 名称
   */
  @Prop({ type: String, default: 'small' }) name ?:string;

}
</script>

<style>
.button {
  border: 1px solid #000;
  line-height: 2em;
  padding: 0 1em;
  display: inline-block;
  border-radius: 3px;
}
  .button  .size-small {
    font-size: 0.8em;
  }
 .button .size-big {
    font-size: 1.5em;
  }

</style>

<template>
  <div>
    <a class="v-list-item" v-for="(item, index) in l" :key="index" :href="item.url">{{item.title}}</a>
  </div>
</template>

<script>
export default {
  name: "VListItem",
  props: ["list"],
  _____e:"VListItem",  
  data: function() {
    var l = this.list;
    l.push({ title: "s" });
    return {
      l: l
    };
  }
};
</script>

<style>
.v-list-item {
  padding: 6px;
  margin: 5px;
}
</style>

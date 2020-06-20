<template>
  <div class="box">
    <slot />
    <el-row :gutter="20">
      <el-col :span="3"
              v-for="(item,index) in list"
              :key="index">
        <el-card class="bidding-card">
          <div slot="header"
               class="clearfix">
            <span>{{item.title}}</span>
          </div>
          <el-button type="primary"
                     @click="handleClick">{{item.label}}</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import { formatDate } from 'utils/util';

export default {
  name: "VList",
  props: ["list"],
  _____e: "VList",
  //当前组件 挂载的时候开启监听
  events: {
    eventName: (params) => {
      console.log("eventName", params, this)
    },
    click: function (params) {
      console.log("click", params, this)
    }
  },
  data () {
    return {
      //   date: formatDate(new Date())
      date: new Date()
    };
  },
  methods: {
    handleClick () {
      console.log("handleClick", this)
      this.$events.emit('eventName', "ddd");
      this.$events.emit('click', "ddd");
    }
  },
  mounted () {
    this.$events.listen('eventName');

  },
  created () {
    console.log("VList.created")
  },
};
</script>
 
<style lang="postcss">
.box .el-card {
  margin-bottom: 12px;
}
.box .el-card__body {
  padding: 10px;
  text-align: center;
}

.box .el-card__header {
  padding: 2px 10px 2px 12px;
  background-color: #eef1f6;
  line-height: 28px;
  text-align: center;
  height: 32px;
  color: rgba(16, 123, 199, 1);
}

.box .el-card__body .el-col {
  margin-bottom: 10px;
}

.box .el-col .el-button {
  border: none;
  padding: 10px;
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
</style>


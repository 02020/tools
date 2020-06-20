
<template>
  <div class="x-table">
    <Row class="operation"
         v-if="buttonList.length > 0">
      <fun-buttons :items="buttonList"
                   @click="handleButtonList"></fun-buttons>
    </Row>
    <Row v-if="selectionVisible">
      <Alert show-icon>
        已选择
        <span class="select-count">{{selectCount}}</span> 项
        <a class="select-clear"
           @click="clearSelectAll">清空</a>
      </Alert>
    </Row>
    <Row>
      <Table border
             size="small"
             :columns="columns"
             :data="data"
             highlight-row
             :span-method="$listeners.handleRowSpan"
             @on-sort-change="changeSort"
             @on-selection-change="changeSelect"
             @on-row-click="$listeners.handleRowClick||{}"
             @on-row-dblclick="$listeners.handleRowDoubleClick||{}"
             @on-current-change="$listeners.handleRowChangeCurrent"
             ref="table"></Table>
    </Row>
    <Row type="flex"
         justify="end"
         class="page"
         v-if="foot">
      <!-- 未接入 -->
      <Page :current="searchForm.pageNumber"
            :total="total"
            :page-size="searchForm.pageSize"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
            :page-size-opts="[10,20,50]"
            size="small"
            show-total
            show-elevator
            show-sizer></Page>
    </Row>
  </div>
</template>

<script>
//获取生成器
import { funButtons } from "./functional";
import { executeHandle, firstUpper } from '@/utils/handle'
import { renderColumns } from '../application/ThePage/mixins/render'
export default {
  title: "xTable",
  components: { funButtons },
  props: {

    buttonList: {
      type: Array,
      default: []

    }, //按钮列表
    fetchName: String, //接口名称
    columns: Array, //表格列
    rule: Array,//渲染表单
    foot: {
      type: Boolean,
      default: false
    }
  },
  mixins: [],
  computed: {
    //显示选择项
    selectionVisible () {
      return this.columns.some(x => x.type == "selection");
    },
  },
  watch: {

  },
  data () {
    return {
      // 搜索框对应data对象
      searchForm: {
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: 'createTime', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      data: [],
      total: 20,
      _data: []

    };
  },
  methods: {
    changePage () { },
    changePageSize () {

    },
    changeSort () {

    },
    changeSelect () { },
    //表格事件-行按钮调用（emit）
    handleRowAction (action, row) {
      executeHandle(this.$listeners, "Row" + action, row)
    },
    //表格上方按钮
    handleButtonList (i) {
      let action = firstUpper(this.buttonList[i].key);
      executeHandle(this.$listeners, "Btn" + action, "test")
    },
    getDataList (v) {
      // console.log("getDataList", this.searchForm);
      this.loading = true

      this.getRequest('/' + this.fetchName + '/getByCondition', this.searchForm).then(res => {
        this.loading = false
        if (res.success) {
          // 该查询分两种情况：myBatis和JPA,其返回的结果不同
          if (res.result.content) { // JPA
            this._data = res.result.content
            this.total = res.result.totalElements
          } else if (res.result.records) { // myBatis
            this._data = res.result.records
            this.total = res.result.total
          }
        }
      })
    },

    // 获取数据
    fetchDataList (callback) {
      this.getRequest(this.fetchName).then(res => {
        this.data = res.result;
        callback && callback(this.data)
      });

    },
  },
  mounted () {
    //this.getDataList()
    this.$on('row-action', this.handleRowAction)
  },
  beforeMount () {
    renderColumns(this, this.columns)

  }
};
</script>

<style  lang="less">
.x-table {
  .operation {
    margin: 0vh 0 1vh 0;
  }

  .page {
    margin-top: 12px;
  }
}
</style>
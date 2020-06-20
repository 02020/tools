
// 简易table
export const xTable = (columns, webUrl) => {
  return {
    name: 'x-table',
    data () {
      return {
        items: [],  //表格数据
        loading: false
      }
    },
    render (h) {
      return h('Table', {
        ref: "xTable",
        props: {
          loading: this.loading,
          columns: columns,
          data: this.items
        }
      })
    },
    destroyed () {
      C("xTable-destroyed")
    },
    beforeCreate () {
      this.loading = true
      let resp = getRequest(webUrl)
      resp.then(res => {
        this.loading = false
        if (res.success) {
          this.items = res.result
        }
      })
    },
    mounted () {
    }
  }
}



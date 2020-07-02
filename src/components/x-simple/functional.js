
// 函数式组件
// 没有this 不能使用this.$emit('click',arg)
// 通过属性来传递方法
export const funButtons = {
  name: 'functional-buttons',
  functional: true,
  props: {
    items: Array
  },
  render (h, { data, props, listeners, children }) {
    return props.items.map((x, i) => {
      const directives = []
      !!x.role && directives.push({
        name: 'hasRole',
        rawName: 'v-hasRole',
        value: x.role,
        expression: x.role
      })

      return h('Button', {
        directives: directives,
        props: x,
        on: {
          click: () => {
            listeners.click(i)
          }
        }
      }, x.title)
    })
  }
}


//
export const funDropdown = {
  name: 'functional-dropdown',
  functional: true,
  props: {
    name: { type: String, default: '更多操作' },
    icon: { type: String, default: 'md-arrow-dropdown' },
    items: Array,
    handle: Function
  },
  render (h, { data, props, children }) {
    return h('Dropdown',
      { on: { 'on-click': props.handle } },
      [
        h('Button', null, [
          props.name,
          h('Icon', {
            attrs: { type: props.icon }
          })
        ]),
        h('DropdownMenu',
          { attrs: { slot: 'list' }, slot: 'list' },
          props.items.map((x, i) => {
            return h('DropdownItem', {
              props: x
            }, x.title)
          })
        )

      ])
  }
}
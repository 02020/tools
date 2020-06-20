
// 按钮样式映射
const buttonClassMap = {
  row: {},
  div: { tag: 'div', class: 'btns' },
  group: {
    tag: 'button-group',
    class: '',
    props: {
      size: 'small'
    }
  }
}

// 按钮映射
const buttonMap = {
  save: { key: 'save', title: '保存', type: 'primary', disabled: false },
  cancel: { key: 'cancel', title: '取消', disabled: false },
  reset: { key: 'reset', title: '重置', disabled: false },
  edit: { key: 'edit', title: '编辑', disabled: false },
  add: { key: 'add', title: '新增', type: 'primary', disabled: false },
  export: { key: 'export', title: '导出', disabled: false }
}

// 多重箭头函数与柯里化
// 按钮render
const renderButton = (h, listeners) => props => {
  if (!props) { return }
  const data = {
    props,
    on: {
      click: listeners[props.key]
    }
  }
  return h('Button', data, props.title)
}

// 简易按钮
export const xBtns = {
  name: 'x-buttons',
  functional: true,
  props: {
    items: [Array, String],
    type: {
      type: String,
      default: 'div'
    }
  },
  render (h, { props, listeners }) {

    const fun = renderButton(h, listeners)

    const dom = items => {

      if (Array.isArray(items)) {
        return items.map((x, i) => {
          return fun(x)
        })
      } else {
        return items.split(',').map(x => {
          return fun(buttonMap[x])
        })
      }
    }

    const parent = buttonClassMap[props.type]

    return h(parent.tag, {
      props: parent.props,
      class: parent.class
    }, dom(props.items))
  }
}

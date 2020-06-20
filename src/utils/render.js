import { isBoolean, isString, isObject, isFunction } from '@/utils/is'
import { formatDate } from '@/utils/format'
// 表格操作按钮
export const renderActions = (vm, h, params, key, list) => {
  // list: label,action,type
  const c = list.length - 1; let marginRight = '5px'

  return h('span', list.map((element, index) => {
    const items = Array.isArray(element) ? element : element.split(',')
    const props = { size: 'small' }
    const action = items[0]
    !!items[2] && (props.type = items[2]) // 按钮样式
    let title = items[1]
    if (Array.isArray(title)) {
      if (params.row[action] !== undefined) {
        const value = title.find(x => x.value === params.row[action]) || {}
        title = value.title
      } else {
        console.log(action + '表格操作异常')
      }
    }

    (c === index) && (marginRight = '0px')
    return h(
      'Button',
      {
        props: props,
        style: {
          marginRight: marginRight
        },
        on: {
          click: () => {
            vm.$emit('row-action', action, params.row)
          }
        }
      },
      title
    )
  }))
}
// 渲染每列 上色
const renderColumn = (vm, h, params, key, list) => {
  let o = list.find(x => x.value == params.row[key]);
  (o == undefined) && (o = list[0]) // 如果为空， 则将第一个值设置为默认值
  // console.log(o)
  return h('div', [h('Tag', { props: { color: o.color } }, o.title)])
}

// 判断字段是否存在
const isExistTableHead = (columns, typeName) => {
  return !!columns.find(x => x.type === typeName)
}

// 直接修改原数值
export const renderColumns = (vm, columns) => {
  if (!columns) return

  // 表头
  // !isExistTableHead(columns, "index") && columns.unshift({ type: "index", width: 60, align: "center", fixed: "left" })
  // !isExistTableHead(columns, "selection") && columns.unshift({ type: "selection", width: 60, align: "center", fixed: "left" })

  // console.log("renderColumns",columns.map(x=> x.type))

  columns.forEach(element => {
    const { key, render: _render } = element

    if (!_render) {
      // 没有传渲染
      if (!!element.dict) {
        element.render = (h, params) => {
          // 需要抽离
          const dict = $dict(element.dict)
          if (Array.isArray(dict)) {
            // console.log("params.row[key]", params.row[key], dict)
            if(params.row[key]===undefined){
              return null
            }
            const value = dict.find(x => x.value === params.row[key])  
            if(!value){
           //   console.warn(`字典值错误：${params.row[key]}`)
             // console.warn(dict)
              return null
            }else{
              return h('span', null, value.label || "")
            }
          
          }

        }
      } else {
        return null
      }

    } else if (isFunction(_render)) {
      // 如果是render函数不处理
      element.render = _render
    }
    else {
      // 数据结构
      element.render = (h, params) => {
        if (key == 'action') {
          return renderActions(vm, h, params, key, _render)
        } else {

          if (Array.isArray(_render)) {
            return renderColumn(vm, h, params, key, _render)

          } else if (isObject(_render)) {
            // 对象


          } else if (isString(_render)) {
            //console.log(_render)
            // 文本
            if ("yyyy-MM-dd" === _render || "yyyy-MM-dd" === _render) {
                console.log("params.row[key]", params.row[key])
              return h('span', formatDate(new Date(params.row[key]), _render))

            } else if ("dic" === _render || "dict" === _render) {
              // 增加判断
              return h('span', $dict(key))
            }
          }

        }



      }
    }

  });
  return columns
}

/**
 * page 中查询方式的渲染
 *  items 中项的字段格式 为 create-form  的 josn 文件配置
 *  { type: "i-button", field: "expand", props: { type: 'text', icon: "ios-arrow-down" }, emit: ['click'], children: ["展开"] }
 *
 */
export const renderFormCreateRule = (items) => {
  if (!items) {
    console.log('renderFormCreateRule 传参为空 ')
    return
  }

  const _items = []
  // 表头

  items.forEach(x => {
    !x.props && (x.props = {})

    if (x.type !== 'i-button') {
      x.name = x.field

      !x.props.placeholder && (x.props.placeholder = '请输入' + x.title)
      // 增加属性
      x.props.clearable = true
    }

    // 下拉框
    if (x.type === 'select' || x.type === 'radio') {

      if (!!x.dict) {
        const dict = isBoolean(x.dict) ? x.field : x.dict
        const l = $dict(dict)
        if (l && l.length > 0) {
          x.options = l

        } else {
          C("字典值异常:"+ dict)
        }

      }

    }

    if (x.type === 'DatePicker') {
      !x.props.placeholder && (x.props.placeholder = '选择起始时间')
      x.props.format = 'yyyy-MM-dd'
    }

    _items.push(Object.assign({}, x))
  })

  const formCreateRule = [
    ['isearch', '搜索', 'primary'],
    ['ireset', '重置', 'default'],
    ['iexpand', '收起', 'text', 'ios-arrow-up']
  ].map(function (x, index) {
    const props = { type: x[2] }
    !!x[3] && (props.icon = x[3])

    return {
      // name: x[0],
      type: 'i-button',
      field: x[0],
      props,
      style: {
        marginLeft: index === 0 ? '20px' : '8px'
      },
      emit: ['click'],
      children: [x[1]]
    }
  })
  formCreateRule.forEach(x => _items.push(x))

  return _items
}

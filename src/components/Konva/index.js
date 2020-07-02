/** @format */

// 权属表更图表组件
// import Konva from 'konva'
import Qstruct from '../../utils/qstruct'
const Konva ={}
import {
  titleEntity,
  textEntity,
  stateEntity,
  tagEntity,
  rectEntity,
  arrowEntity,
  stateColor,
  defaultValue
} from './config'

const getConfigFromText = ({text,date}) => {
  let content = Array.isArray(text) ? text : text.split(',')
  let content2 = content.slice(1).join('\n')
 
  content2 = !date ? content2 : content2 + '\n\n'
  // 获取标题的高度
  
  const titleHeight = new Konva.Text(
    Object.assign({}, titleEntity, { text: content[0] })
  ).height()

  let line = Math.ceil((titleHeight - 20) / 16.8)
  line = line > 1 ? line + 1 : 2

  content2 = new Array(line).join('\n') + content2

  const contentHeight = new Konva.Text(
    Object.assign({}, titleEntity, { text: content2 })
  ).height()

  const stateOffset = contentHeight - 8
  return {
    title: content[0],
    content: content2,
    titleHeight,
    stateOffset,
    arrowOffset: line * 16.8
  }
}

// 块 项目内容
const renderBlock = ({
  date,
  title,
  titleHeight,stateOffset,
  content,
  color,
  id,
  x,
  y
}) => ({
  render(h) {
    const _c = h
console.log(title)
    const dom = []

    // 文本内容2
    dom.push(
      _c('v-label', [
        _c('v-tag', {
          attrs: { config: Object.assign({}, tagEntity, { fill: color }) }
        }),
        _c('v-text', {
          attrs: { config: Object.assign(textEntity, { text: content, id }) }
        })
      ])
    )
    // 文本内容1-标题存在换行
    dom.push(
      _c('v-label', [
        _c('v-text', {
          attrs: { config: Object.assign(titleEntity, { text: title }) }
        })
      ])
    )

    // 日期+状态
    if (date) {
      dom.push(
        _c('v-label', { attrs: { config: { x: 10, y: stateOffset } } }, [
          _c('v-tag', { attrs: { config: Object.assign({}, tagEntity) } }),
          _c('v-text', {
            attrs: { config: Object.assign({}, stateEntity, { text: date }) }
          })
        ])
      )
    }

    return _c('v-group', { attrs: { config: { x, y } } }, dom)
  }
})

// 容器列：项目初始、变更等
const renderContainer = ({ title, items, x, y }) => ({
  render(h) {
    const _c = h
    const { container, block } = defaultValue
    let y = container.y

    const blocks = items.map((item, index) => {
      const _t = getConfigFromText(item)

      item.title = _t.title
      item.content = _t.content
      item.titleHeight = _t.titleHeight
      item.stateOffset = _t.stateOffset
      item.x = block.startX //
      item.y = y + block.startY
      y += !item.date ? 132 : 175
      y += item.titleHeight - 25
      item.color = stateColor[item.state]
      return h(renderBlock(item))
    })

    return _c('v-group', { attrs: { config: { x, y: container.y } } }, [
      _c('v-rect', {
        attrs: { config: Object.assign({}, rectEntity, { height: y + 60 }) }
      }),
      _c('v-label', [
        _c('v-tag', {
          attrs: { config: { fill: '#19be6b', cornerRadius: 4 } }
        }),
        _c('v-text', {
          attrs: {
            config: {
              width: 230,
              align: 'center',
              text: title,
              fontSize: 14,
              padding: 10,
              fill: 'white'
            }
          }
        })
      ]),
      blocks
    ])
  }
})

// 获取箭头的Y轴坐标位置
function getArrowPositionY(items) {
  const qstruct = new Qstruct(items, 'id')
  const keyIndexs = qstruct.getSameKeyIndexs()
  const { arrow, block } = defaultValue
  // C('keyIndexs', keyIndexs)
  if (Array.isArray(keyIndexs) && keyIndexs.length > 0) {
    return keyIndexs.reduce((defaultValueial, row) => {
      const hs = []
      let num = 0
      row.forEach((x, iCol) => {
        x.forEach(y => {
          let i = y
          hs[num] = {
            col: iCol,
            y: arrow.startY // 初始值
          }
          do {
            if (!items[iCol].items[i]) {
              console.error('getArrowPositionY数据异常')
            } else {
              const _t = getConfigFromText(items[iCol].items[i]);
              const h = _t.arrowOffset + block.margin +
                (!items[iCol].items[i].date ? block.height : block.heightState)

 
              hs[num].y += i === y ? h / 2 : h
            }
          } while (i--)
          num += 1
        })
      })

      hs.forEach(x => {
        const startX =
          arrow.startX +
          x.col * (defaultValue.container.margin + defaultValue.container.width)
        const _h = hs.find(x => x.col === h.col + 1)
        _h && defaultValueial.push([startX, h.y, startX + arrow.length, _h.y])
      })

      return defaultValueial
    }, [])
  } else {
    return []
  }
}

const _Konva = {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  name: 'Konva',
  render(h) {
    let x = defaultValue.container.x
    const width = defaultValue.container.margin + defaultValue.container.width
    const arrows = getArrowPositionY(this.items)

    return h('v-layer', null, [
      this.items.map((item, index) => {
        item.x = x //
        item.y = 0
        x += width
        return h(renderContainer(item))
      }),
      arrows.map(arrow => {
        return h('v-arrow', {
          attrs: { config: Object.assign({}, arrowEntity, { points: arrow }) }
        })
      })
    ])
  }
}

export default _Konva

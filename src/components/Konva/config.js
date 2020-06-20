// #19be6b 绿色
// #515a6e 灰色

const titleEntity = {
  text: '',
  fontSize: 14,
  padding: 10,
  fill: 'white',
  align: 'center',
  width:190, 
   lineHeight: 1.2
}

//
const textEntity = {
  padding: 12,
  text: '',
  fontSize: 14,
  lineHeight: 1.5,
  align: 'center',
  fill: '#fff'
}

const stateEntity = {
  text: '',
  fontSize: 14,
  padding: 10,
  fill: 'white',
  align: 'center',
  width: 170
}
// 日期+状态
const tagEntity = {
  fill: '#515a6e',
  stroke: '#fff',
  strokeWidth: 2,
  cornerRadius: 4
}
//  矩形框
const rectEntity = {
  stroke: '#dcdee2',
  strokeWidth: 2,
  fill: '#f8f8f9',
  width: 230,
  height: 400, // 传入
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4,
  shadowOpacity: 0.1,
  cornerRadius: 6
}
// 箭头配置
const arrowEntity = {
  points: [30, 100, 130, 130], // x1,y1,x2,y2
  pointerLength: 8,
  pointerWidth: 8,
  fill: '#515a6e',
  stroke: '#515a6e',
  strokeWidth: 2
}

// 0 注销 1 有效  2 办理中
const stateColor = ['#ed4014', '#19be6b', '#ff9900']

// 配置
const defaultValue = {
  // 容器的配置
  container: {
    x: 0,
    y: 0,
    width: 230,
    margin: 120
  },
  arrow: {
    startX: 200,
    startY: 50,
    length: 170 // 水平方向长度
  },
  block: {
    startX: 20,
    startY: 50,
    height: 104, // 不包含状态
    heightState: 148,
    margin: 12
  }

}

export {
  titleEntity,
  textEntity,
  stateEntity,
  tagEntity,
  rectEntity,
  arrowEntity,
  stateColor,
  defaultValue
}

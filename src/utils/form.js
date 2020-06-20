// form-create 查询表单配置
export const formCreateOption = ({ global, inline, labelWidth, labelPosition } = {}) => {
  const defalutValue = {
    col: {
      span: 8
    },
    props:
    {
      clearable: true,
      format: 'yyyy-MM-dd'
    }
  }

  return {

    global: {
      '*': Object.assign({}, defalutValue, global)
    },
    submitBtn: {
      show: false // 是否显示,默认显示
    },
    resetBtn: false, // 显示表单重置按钮

    form: {
      inline: inline || false, // 是否开启行内表单模式，开启后不能使用隐藏
      labelPosition: labelPosition || 'right', // left、right、top
      // 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
      labelWidth: labelWidth || 150,
      // 是否显示校验错误信息
      showMessage: true,
      // 原生的 autocomplete 属性，可选值为 off 或 on
      autocomplete: 'off'
    }
  }
}


import Vue from 'vue'
// import store from '@/store'


const Modal = (options, cb) => {
  return {
    name: 'x-modal',
    // store,

    data () {
      return {
        value: true, // value控制显示隐藏model使用的值
        ...options
      }
    },
    render (h) {
      const child = cb(h, this)

      let on = !this.$data.on ? {} : Object.keys(this.$data.on).reduce((inital, key) => {
        inital['on-' + key] = this.$data.on[key]
        return inital
      }, {})

      on['on-visible-change'] = this.remove
      options['__close'] = this.remove


      return h('Modal',
        {
          props: this.$data,
          on
        },
        child
      )
    },
    methods: {
      remove () {

        this.value = !this.value
        // C("remove",this.value )
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    },
    destroyed () {
      // C("destroyed")
    }
  }
}

const ModalForm = ({ props, btns, form }) => {
  const { option, rule } = form
  return Modal(props, (h, _vm) => {
    // console.log("modalFormd", option)

    // 自定义按钮
    const footer = !btns ? null : h("x-btns", {
      slot: 'footer',
      attrs: { items: btns },
      on: btns.reduce((inital, current) => {
        inital[current.key] = current.handle
        return inital
      }, {})
    })

    return [
      footer,
      h("form-create", {
        ref: "fc",
        props: { rule, option },
        class: "table-form",
        model: {
          value: form.fApi,
          callback: function ($$v) {
            form.fApi = $$v
          },
          expression: "form.fApi"
        }
      })
    ]
  })

}

function createDocument () {
  const template = `<a class="__temp__modal__close ivu-modal-close"><i class="ivu-icon ivu-icon-ios-close"></i></a>`;
  let doc = new DOMParser().parseFromString(template, 'text/html');
  let div = doc.querySelector('.__temp__modal__close');
  return div;
}




export function mount (options, content, $el) {
  const $modal = Vue.extend(Modal(options, content))
  const $vm = new $modal().$mount()
  if (!!options.attachColse) {
    const closeEl = new Vue({
      render: h => {
        return h(
          'a',
          {
            class: 'ivu-modal-close',
            on: {
              click: options['__close']
            }
          },
          [h('i', { class: 'ivu-icon ivu-icon-ios-close' })]
        )
      }
    }).$mount()

    const dom = $vm.$el.getElementsByClassName('ivu-modal-content')[0]
    dom.appendChild(closeEl.$el)
  }


  !$el && ($el = window.document.body)

  $el.appendChild($vm.$el)
}

export function modalForm ({ props, btns, form }, $el) {
  const $modal = Vue.extend(ModalForm({ props, btns, form }))
  const $vm = new $modal().$mount()
  !$el && ($el = window.document.body)
  $el.appendChild($vm.$el)
}


/**

      const closeBtnText = '我的取消'
      const okBtnText = '确定' 

      const btns = [
        { key: "delete", title: "取消",type:"text", handle: () => { C("asdf") } },
        { key: "add", title: "添加", type: "primary", handle: () => { C("asdf") } }
      ]

 */


export function defaultOnHandle (src, title) {
  mount({ title, footerHide: true }, vNode => {
    return vNode.make('img', {
      style: { width: '100%' },
      attrs: { src }
    })
  })
}

export default Modal


/*
      const fApi = {}
      const rule = [{ type: 'input', title: '类别', field: 'goods_name' }]

      const props = { title: "添加类别" }

      const btns = [
        { key: "delete", title: "取消", type: "text", handle: () => { C("asdf") } },
        { key: "add", title: "添加", type: "primary", handle: () => { C("asdf") } }
      ]
      const option = {
        submitBtn: {
          show: false // 是否显示,默认显示
        }, // 显示表单重置按钮
        resetBtn: false,
        form: {
          inline: false, // 是否
          labelWidth: 90,
        }
      }

      modalForm({ props, fApi, option, rule, btns })

*/
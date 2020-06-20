/** @format */

interface Subscribe {
  [key: string]: Array<Watcher>;
}

class Watcher {
  /** 节点 */
  node: Element;

  /** Element的属性名称 */
  attr: string;

  /** 数据代理器 */
  data: ProxyConstructor;

  /** 需要监听的属性 - Data中key */
  property: string; //

  constructor(node, attr, data, property) {
    this.node = node;
    this.attr = attr;
    this.data = data;
    this.property = property;
  }
  /** 将变化后的数据赋值给DOM节点对应的属性 */
  update() {
    this.node[this.attr] = this.data[this.property];
  }
}

class ProxyVue {
  /** 配置数据 */
  $options: {
    methods: Object;
    data: Object;
  };
  $methods: Object;
  _methods: Object;
  /**
   * 订阅
   * @type {Subscribe}
   * @memberof ProxyVue
   */
  subscribe: Subscribe;
  _data: Object;
  $data: ProxyConstructor;

  constructor(options) {
    this.$options = options || {};
    this.$methods = this._methods = this.$options.methods;
    const data = (this._data = this.$options.data);
    this.subscribe = {};
    this.observe(data);
    this.compile(options.el);
  }
  /**
   * 添加[]到[订阅]
   * @param watcher
   */
  publish(watcher: Watcher) {
    if (!this.subscribe[watcher.property]) this.subscribe[watcher.property] = [];
    this.subscribe[watcher.property].push(watcher);
  }
  /**
   * 创建代理
   * @param data
   */
  observe(data: Object) {
    const that = this;
    let handler = {
      get(target, property: string) {
        return target[property];
      },
      set(target, property: string, value) {
        let res = Reflect.set(target, property, value);
        // 如果修改了 data 中的值
        that.subscribe[property].map((item) => {
          item.update();
        });
        return res;
      },
    };
    this.$data = new Proxy(data, handler);
  }
  compile(el) {
    const nodes = Array.prototype.slice.call(document.querySelector(el).children);
    let data = this.$data;
    nodes.map((node) => {
      if (node.children.length > 0) this._complie(node);
      if (node.hasAttribute('v-bind')) {
        let property = node.getAttribute('v-bind');
        this.publish(new Watcher(node, 'innerHTML', data, property));
      }
      if (node.hasAttribute('v-model')) {
        let property = node.getAttribute('v-model');
        this.publish(new Watcher(node, 'value', data, property));
        node.addEventListener('input', () => {
          data[property] = node.value;
        });
      }
      if (node.hasAttribute('v-click')) {
        let methodName = node.getAttribute('v-click');
        // 改变方法的指向 使用 this 就可以调用 data 中的变量
        let method = this.$methods[methodName].bind(data);
        node.addEventListener('click', method);
      }
    });
  }
  _complie(node: any) {
    throw new Error('Method not implemented.');
  }
}

export default ProxyVue;

/*


// 渲染todoList列表
const Render = {
  // 初始化
  init: function (arr) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      fragment.appendChild(li);
    }
    list.appendChild(fragment);
  },
  addList: function (val) {
    const li = document.createElement('li');
    li.textContent = val;
    list.appendChild(li);
  },
};


// 实例化一个proxyVue
window.onload = function() {
  let vm = new proxyVue({
    el: "#app",
    data: {
      num: 0,
      arr: []
    },
    methods: {
      addList() {
        this.arr.push(this.num);
        Render.addList(this.num);
      }
    }
  });
};




    <div id="app">
      <input type="text" v-model="num" />
      <input id="btn" type="button" value="添加到Todolist" v-click="addList" /><br/>
      <span>您输入的是：</span><span v-bind="num"></span>
      <ul id="list"></ul>
    </div>

*/

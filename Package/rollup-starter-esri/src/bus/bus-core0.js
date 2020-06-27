/** @module event-bus/bus-core */
// import store from '@/store';
import baseLayer from '../layer/baseLayer';
import layerCURD from './layer-curd';
import esriMapEmit from './emit';
import { initDrawEmit, initEsriEmit } from './initEvents';
import Measure from '../utils/measure-utils'


function plugin (Vue, mixin) {
  if (plugin.installed) {
    return;
  }

  const events = new Vue({
    // store,
    mixins: mixin,
    data () {
      return {
        eventMap: {},
        view: {},
        layerList: [],
        hitTest: true,  // 控制是否或是点击图形
        isPopup: false,  // 点击是否显示弹窗
      };
    },
    computed: {
      visibleList () {
        // {layers, allLayers, basemap, ground}
        return this.view.map.allLayers;
      },
    },
    methods: {
      emit (name, data = null) {
        this.$emit(name, data);
      },
      on (name, cb) {
        this.eventMap[name] = cb;
        this.$on(name, cb);
      },
      once (name, cb) {
        this.eventMap[name] = cb;
        this.$once(name, cb);
      },
      off (name, cb) {
        if (!cb) {
          cb = this.eventMap[name];
        }
        this.$off(name, cb);
      },
      removeAll () {
        this.$off();
      },
      init (view, current) {
        initEsriEmit(view, this, current)
      },


      // todo
      /**
       * @event curd
       * @param {*} id 
       * @param {*} name 
       * @param {*} type 
       * @param {*} group 
       */
      curd (id, name, type, group = 'default') {
        this.layerList.push({ id, name, type, group });

        ['add', 'select', 'update', 'delete'].forEach((x) => {
          // const eventName = 'esri' === layerId ? layerId : current + '-' + layerId;

          var m = 'esri' === id ? esriMapEmit(x, this) : layerCURD[x];

          this.on(id + '-' + x, m);
        });
      },

      /**
       * 增加图层
       * @function add 
       * @param {Object} layerInfo 图层信息
       * @param {String} group 组名
      */
      add (layerInfo, group) {
        layerInfo.visible = false;
        let ly = baseLayer(layerInfo);
        console.log("add", ly)
        this.curd(ly.id, layerInfo.layerName, layerInfo.layerType, group);
        if (!!this.findLayerById(ly.id)) return;

        this.view.map.add(ly);
      },

      /**
       * 增加多个图层
       * @function addMany 
       * @param {Array} list List<layerInfo>
       * @param {String} group 组名
      */
      addMany (list, group) {
        // const _list = list.map((x) => {
        //   x.visible = false;
        //   let ly = baseLayer(x);
        //   this.curd(ly.id, x.layerName, x.layerType, group);
        //   return ly;
        // });
        // 增加地图已经存在判断
        const _list = list.reduce((init, cur) => {
          cur.visible = false;
          let ly = baseLayer(cur);
          if (!this.findLayerById(cur.id)) {
            this.curd(ly.id, cur.layerName, cur.layerType, group);
            init.push(cur)
            return init
          }
        }, []);

        console.log(_list);

        // fixme 暂时注释掉
        // this.view.map.addMany(_list);
      },
      // 获取图层
      findLayerById (id) {
        return this.view.map.findLayerById(id);
      },
      /**
       *  显示弹窗
       */
      popupInfo (response) {
        if (!this.isPopup) return
        const view = this.view

        response.results.forEach(x => {
          if (x.graphic.type = 'polygon') {
            // x.graphic.centroid
          }

          view.popup.content = x.graphic.popup.content
          view.popup.location = x.mapPoint
          view.popup.visible = true;




          // x.graphic.layer.remove(x.graphic)  centroid
        });



      },
      remove () { },
      removeAll () { },
      removeMany () { },
      reorder () { }
    },
    created () { },
  });

  Vue.mixin({
    beforeCreate () {
      // console.log("this.$options", this.$options);
      if (typeof this.$options.events !== 'object') return;

      var eventMap = {};
      for (var key in this.$options.events) {
        eventMap[key] = this.$options.events[key].bind(this);
      }
      const component = this
      this.$once('hook:beforeMount', () => {

        for (var key in eventMap) {
          events.$on(key, eventMap[key]);
        }

        events.once('init', (view) => {
          // 代码注入 组件定义角色 注入指定方法
          component.initDraw = initDrawEmit(events.view, events)
          Measure.init(events.view)
          component.$Measure = Measure
          console.log("init", component)
        })

      });
      this.$once('hook:beforeDestroy', () => {
        for (var key in eventMap) {
          events.$off(key, eventMap[key]);
        }
        eventMap = null;
      });
    },
  });

  Vue.events = events;

  Object.defineProperty(Vue.prototype, '$bus', {
    get () {
      return events;
    },
  });
}

export default data => Vue => {
  plugin(Vue, data);
};


/*

    fire (name, data = null) {
        this.emit(name, data);
      },
      emit (name, data = null) {
        this.$emit(name, data);
      },
      listen (name, cb) {
        this.on(name, cb);
      },
      listenOnce (name, cb) {
        this.once(name, cb);
      },
      on (name, cb) {
        this.evmap[name] = cb;
        this.$on(name, cb);
      },
      once (name, cb) {
        this.evmap[name] = cb;
        this.$once(name, cb);
      },
      off (name, cb) {
        if (!cb) {
          cb = this.evmap[name];
        }
        this.$off(name, cb);
      },
      unlisten (name, cb) {
        this.off(name, cb);
      },
      removeAll () {
        this.$off();
      },


 */
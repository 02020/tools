/** @module event-bus/layer-curd */
import handleGraphic from './graphic'

/*
 * 图层属性
 */
const LAYER_PROPERTIES = ['minScale', 'maxScale', 'opacity', 'visible'];

//let { layerId, graphId, minScale ,  maxScale , opacity,   visible  } = args;

/** 
 * 图层的增删改查操作
 */
export default {
  /**

   */
  select (emitEntity) {
    const { layer, view, id, args } = emitEntity;
    console.log('地图-查询', layer);

    layer.visible = args.visible;
    // this.emit(id+"-select",args);
  },

  /**
   * @param {} emitEntity  操作实体 (业务代码分发给图层的)
   * @property  {Object} emitEntity - 操作实体(业务代码分发给图层的)
   * @property  {Object} emitEntity.view - esri.view
   * @property  {Object} emitEntity.layer - 操作的图层
   * @property  {String} emitEntity.id - 图层ID
   * @property  {Object} emitEntity.args - 业务代码提交的参数
   */
  update (emitEntity) {
    console.log("layer-update", emitEntity);

    const { layer, view, id, args } = emitEntity;
    LAYER_PROPERTIES.forEach((x) => {
      args[x] != undefined && !!layer && (layer[x] = args[x]);
    });

    let graphics = args['graphics']

    if (graphics != undefined) {
      graphics = Array.isArray(graphics) ? graphics : [graphics];
      // 执行图形操作

      handleGraphic(view, layer, graphics)

      console.log("view", view)

    }



    // console.log(this.esriMap);
    // console.log('地图-更新', args);
  },
  delete (args) {
    console.log('地图-删除', args);
  },

  add (args) {
    console.log('地图-增加', args);
  },
};

/* todo 图层控制 curd
  如果图层不存在，则新增
  需要保存需要新增的图层列表
  用layerName 来识别layerId

  标绘:  GraphicsLayer






*/


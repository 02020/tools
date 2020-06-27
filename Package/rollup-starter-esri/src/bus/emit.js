/** @module event-bus/emit */

/**
 * 地图接收信息，根据入参分发给相应图层
 * @param {*} event 事件名称
 * @param {*} vm bus的上下文
 * @returns 返回函数
 * @see {@link esriMapEmit}
 * 
 */
const esriMapEmitCURD = (event, vm) => {

  return (params) => {
    let args = Array.isArray(params) ? params : [params];
    // 改变指向
    const curry = esriMapEmit(event, vm)

    args.forEach(curry);
  };
}
/**
 * @description 供esriMapEmitCURD调用的内部函数
 * @param  {String} event -  事件名称
 * @param  {Object}  bus  组件上下文
 * @param  {String} emitEntity -  操作实体(业务代码分发给图层的)
 * @property  {Object} emitEntity - 操作实体(业务代码分发给图层的)
 * @property  {(string|Array)} emitEntity.ids - 需要分发的图层ID
 * @property  {string} emitEntity.group - 需要分发的图层组
 * @property  {Array} emitEntity.exclude - 不用分发的图层ID (结合group使用)
 * @property  {Array} emitEntity.graphics - 需要更新的图形列表
 * @property  {Array} emitEntity.graphics.geometry - 图形.id
 * @property  {Array} emitEntity.graphics.symbol - 图形.样式
 * @property  {Array} emitEntity.graphics.attributes - 图形.属性
 */
const esriMapEmit = (event, bus) => emitEntity => {

  let { ids, group, exclude } = emitEntity;
  ids = Array.isArray(ids) ? ids : [...ids.split(',')];

  if (!!group) {

    const f = (x) => {
      return group.indexOf(x.group) > -1
        && (!exclude ? true : exclude.indexOf(x.id) < 0);
    }

    ids = bus.layerList
      .filter(f)
      .map((x) => x.id)

  }

  //console.log("esriMapEmit", emitEntity, event, bus.layerList, ids);
  ids.forEach((id) => {
    const layer = bus.view.map.findLayerById(id);

    if (!layer) console.log(`curd 执行失败，${id}`);

    bus.emit(id + '-' + event, { view: bus.view, id: id, layer: layer, args: emitEntity });
  });

}

export default esriMapEmitCURD
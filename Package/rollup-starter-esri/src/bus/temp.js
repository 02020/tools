
/**
 * 处理图形
 * @param {*} view
 * @param {*} layer
 * @param {*} graphics
 * @property  {Object} graphics - 图形实体
 * @property  {Object} graphics.id - 图形.id
 * @property  {Object} graphics.geometry - 图形.位置
 * @property  {Object} graphics.attributes - 图形.属性
 * @property  {Object} graphics.symbol - 图形.样式
 */
function handle (view, layer, graphics) {
  console.log(' layer.graphics', layer);
  // console.log(" layer.graphics", layer.graphics)
  var _list = layer.graphics.items;
  // for (var i = 0; i < _list.items.length; ++i) {
  //   var graphic = _list.items[i];
  //   console.log(graphic)
  //   //  var path = graphic.geometry.paths[0];
  //   //  var color = graphic.attributes["color"];

  // }

  graphics.forEach((g) => {
    let _g = _list.find((x) => x.id == g.id);
    console.log('handle', g);
    if (!!_g) {
      if ('pointer-move' == g.geometry.type) {
        g.geometry = view.toMap(g.geometry);
      }

      _g.geometry = g.geometry;
      _g.symbol = g.symbol;
      _g.attributes = g.attributes;
    } else {
      layer.add(new Graphic(g));
    }
  });
}


markerSetting.el = document.createElement("infoWindow")
const node = new Vue(markerSetting)


view.popup.open({
  location: view.center.clone(),
  visible: true,
  content: node.$el,
  featureNavigation: false,
})
console.log("click", view.popup)

layer.graphics = {
  length: {},
  items: {},
  owner: layer
}


// Add graphics to GraphicsLayer directly as an array
layer.graphics = [graphicA, graphicB];

// Add graphics to layer via Collection
layer.graphics.addMany([graphicC, graphicD]);

// Add graphics to layer via Collection
layer.graphics.push(graphicC, graphicD);

var graphicA = new Graphic({  // graphic with line geometry
  geometry: new Polyline({ ...}), // set geometry here
  symbol: new SimpleLineSymbol({ ...}) // set symbol here
});

// Add graphic when GraphicsLayer is constructed
var layer = new GraphicsLayer({
  graphics: [graphicA]
});

// Add graphic to graphics collection
layer.graphics.add(graphicB);

// Add graphic using add()
layer.add(graphicC);
layer.addMany([graphicD, graphicE]);

// Add graphics using push method graphics collection
layer.graphics.push(graphic1, graphic2);


var polylineGraphic = new Graphic({
  geometry: polyline,
  symbol: polylineSymbol,
  attributes: polylineAtt
});

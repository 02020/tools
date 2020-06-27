// http://g.com/esri/v415_sdk/latest/api-reference/esri-views-draw-Draw.html

import Graphic from 'esri/Graphic'
import geometryEngine from 'esri/geometry/geometryEngine'


let view = {}
let geometryType = ""
// create a new graphic presenting the polyline that is being drawn on the view
const createGraphic = (event, drawAction) => {

  !!event.view && (view = event.view)
  geometryType = drawAction
  const vertices = event.vertices;

  view.graphics.removeAll();




  // a graphic representing the polyline that is being drawn
  const graphic = new Graphic({
    geometry: {
      type: geometryType,
      paths: vertices,
      spatialReference: view.spatialReference
    },
    symbol: {
      type: "simple-line", // autocasts as new SimpleFillSymbol
      color: [4, 90, 141],
      width: 2,
      cap: "round",
      join: "round"
    }
  });

  // check if the polyline intersects itself.
  const intersectingSegment = getIntersectingSegment(graphic.geometry);

  // Add a new graphic for the intersecting segment.
  if (intersectingSegment) {
    view.graphics.addMany([graphic, intersectingSegment]);
  }
  // Just add the graphic representing the polyline if no intersection
  else {
    view.graphics.add(graphic);
  }

  // return intersectingSegment
  return {
    selfIntersects: intersectingSegment
  };
}

// function that checks if the line intersects itself
function isSelfIntersecting (polyline) {
  if (polyline.paths[0].length < 3) {
    return false;
  }
  const line = polyline.clone();

  //get the last segment from the polyline that is being drawn
  const lastSegment = getLastSegment(polyline);
  line.removePoint(0, line.paths[0].length - 1);

  // returns true if the line intersects itself, false otherwise
  return geometryEngine.crosses(lastSegment, line);
}

// Checks if the line intersects itself. If yes, change the last
// segment's symbol giving a visual feedback to the user.
/**
 * 自相交判断
 * @param {Object} polyline 
 */
const getIntersectingSegment = (polyline) => {
  if (isSelfIntersecting(polyline)) {
    return new Graphic({
      geometry: getLastSegment(polyline),
      symbol: {
        type: "simple-line", // autocasts as new SimpleLineSymbol
        style: "short-dot",
        width: 3.5,
        color: "yellow"
      }
    });
  }
  return null;
}

/**
 * 获取最后一个线段
 * @param {*} polyline 
 */
const getLastSegment = (polyline) => {
  const line = polyline.clone();
  const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
  const existingLineFinalPoint = line.getPoint(
    0,
    line.paths[0].length - 1
  );

  return {
    type: geometryType,
    spatialReference: view.spatialReference,
    hasZ: false,
    paths: [
      [
        [existingLineFinalPoint.x, existingLineFinalPoint.y],
        [lastXYPoint.x, lastXYPoint.y]
      ]
    ]
  };
}




export { createGraphic }
/*





*/

import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol'
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol'
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol'
import PictureFillSymbol from 'esri/symbols/PictureFillSymbol'
import TextSymbol from 'esri/symbols/TextSymbol'

import Color from 'esri/Color'


// 导入默认样式

const SFS = SimpleFillSymbol,
  SLS = SimpleLineSymbol,
  SMS = SimpleMarkerSymbol;


var getSymbol = function (symbolName) {
  switch (symbolName) {
    case 'SimpleMarkerSymbol':
      return new SimpleMarkerSymbol({ style: 'diamond', size: 10, color: '#40d47e' });
      break;
    case 'PictureMarkerSymbol':
      return new PictureMarkerSymbol({
        url: 'https://arcgis.github.io/arcgis-samples-javascript/sample-data/cat3.png',
        width: 100,
        height: 100,
      });
      break;
    case 'TextSymbol':
      return new TextSymbol({
        text: 'arcgis-js-api',
        font: { size: 40, weight: 'bold', family: ' Web' },
        verticalAlignment: 'middle',
        color: '#e74c3c',
      });
      break;

    case 'PictureFillSymbol':
      return new PictureFillSymbol({
        url: 'https://arcgis.github.io/arcgis-samples-javascript/sample-data/cat3.png',
        width: 110,
        height: 110,
      });
      break;
  }
};
/**
 * 点线面
 * @param {*} type 
 */
const createSymbol = (type) => {
  if (type === "fill" || type === 'area' || 'polygon' === type || 'rectangle' === type) {
    return new SFS("solid", createSymbol("line"), randomColor());
  }

  if (type === "line" || type === 'polyline') {
    return new SLS("solid", randomColor(), randomNum(10));
  }

  return new SMS("circle", randomNum(10), createSymbol("line"), randomColor());
}


function randomColor () {
  return new Color([
    randomNum(255),
    randomNum(255),
    randomNum(255),
    randomNum(1)
  ]);
}

function randomNum (max) {
  var num = Math.random() * max;
  return max > 1 ? Math.ceil(num) : num;
}


var symbol =
  new SimpleFillSymbol(
    SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2),
    new Color([0, 0, 255, 0.5]));

export { getSymbol, createSymbol }



/*

 case 'SimpleLineSymbol':
      return new SimpleLineSymbol({ width: 10, color: [0, 197, 255, 1] });
      break;
    case 'SimpleFillSymbol':
      return new SimpleFillSymbol({ outline: { width: 5, color: '#e74c3c' }, color: [152, 230, 0, 0.25] });
      break;
  */



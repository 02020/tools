
/**
 * 是否数组
 * @param {*} o
 */
function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

/**
* 是否对象
* @param {*} o
*/
function isObject (o) {
  return Object.prototype.toString.call(o) === "[object Object]" && Object.keys(o).length > 0
}

function isFunction (o){
  return Object.prototype.toString.call(o) === '[object Function]'
}

const isBoolean = val => typeof val === 'boolean';

/**
* 是否数值
* @param {*} o
*/
function isNumber (o) {
  return Object.prototype.toString.call(o) === '[object Number]';
}

/**
* 是否字符串
* @param {*} o
*/
function isString (o) {
  return Object.prototype.toString.call(o) === '[object String]';
}

/**
* 是否已定义
* @param {*} o
*/
function isDefined (o) {
  return o !== undefined && o !== null;
}


function isArrayRepeat (array) {
  return [...new Set(array)].length === array.length;
}




function isJSONString (str) {
  let result = false;

  if (str && typeof str === 'string') {
    let rvalidchars = /^[\],:{}\s]*$/,
      rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
      rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
      rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
      rbrace = /^(?:\{.*\}|\[.*\])$/;

    // 如果包含空格，IE可能出错
    str = str.replace(/^\s+|\s+$/g, '');

    if (rbrace.test(str)) {
      // Make sure the incoming data is actual JSON
      // borrowed from http://json.org/json2.js
      if (
        rvalidchars.test(
          str
            .replace(rvalidescape, '@')
            .replace(rvalidtokens, ']')
            .replace(rvalidbraces, '')
        )
      ) {
        result = true;
      }
    }
  }

  return result;
}

//key
function d (props) {
  if (Object.keys(props).length > 0) {
    Object.keys(props).forEach(_key => {
      let _value = props[_key],
        _ignore = false;
      //业务代码
    })

  }
}


export  {
  isArray,
  isFunction,
  isObject,
  isNumber,
  isString,
  isDefined,
  isArrayRepeat,
  isJSONString,
  isBoolean
}
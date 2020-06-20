import { formCreateOption } from './form'
import util from './util'
import store from "@/store"
import is from "./is"
export { getListeners } from './handle'

export const dict = key => {
  const dicts = store.state.dict

  if (JSON.stringify(dicts.all) === '{}') {
    dicts.all = JSON.parse(window.localStorage.getItem('dictsAll'))
  }

  let dic = dicts.all[key]
  if (Array.isArray(dic)) {
    return dic.map(x => {
      return {
        label: x.title,
        value: x.value
      }

    })
  } else {
    console.error(`dict值:${key}无效`)
    return [{ label: "-", value: 0 }]
  }
}


export const reduce = (items, values) => {

  if (Array.isArray(items) && items.length > 0) {

    return items.reduce((inital, current) => {
      inital[current] = values[current]
      return inital
    }, {})

  } else {

    return null

  }
}


// key,items
// 根据关键字将数组转换成对象
function arrayToObject (list, key = "key", itemsKey = 'items') {
  if (Array.isArray(list)) {
      return list.reduce((initial, o) => {
          initial[o[key]] = o[itemsKey]
          return initial
      }, {})
  } else {
      return {}
  }
}


function sliceArray (array, size) {
  let result = [];
  for (let x = 0; x < Math.ceil(array.length / size); x++) {
      let start = x * size;
      let end = start + size;
      result.push(array.slice(start, end));
  }
  return result;
}

function deepCopy (obj) {
  if (obj == null || 'object' !== typeof obj) return obj;
  let copy = obj.constructor();

  for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
          copy[attr] = deepCopy(obj[attr]);
      }
  }

  return copy;
}


export default {
  formCreateOption,
  dict,
  deepCopy: deepCopy,
  arrayToObject: arrayToObject
}

export function firstUpper (name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function getHandleName (name, action) {
  name = firstUpper(name).trim()
  action = firstUpper(action).trim()
  return `handle${name}${action}`
}

export function executeHandle (listeners, action, param) {
  const handleName = action.indexOf('handle') > -1 ? action : `handle${action}`
  if (listeners[handleName]) {
    listeners[handleName](param)
  } else {
    console.log('executeHandle无效:' + handleName)
  }
}

export const applyHandle = (listeners, name, action, param) => {

  executeHandle(listeners, getHandleName(name, action), param)
}


// 返回对象：事件方法
export const getListeners = (name, actions, content) => {
  const _name = firstUpper(name)

  return actions.reduce((initial, x, index, arr) => {
    const handle = `handle${_name}${firstUpper(x)}`
    if (!content[handle]) {
      console.error('getListeners:' + handle)
    } else {
      initial[handle] = content[handle]
    }
    return initial
  }, {})

}

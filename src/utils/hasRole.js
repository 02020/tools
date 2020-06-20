import { getStore } from './storage'

const hasRole = {
  install (Vue, options) {
    Vue.directive('hasRole', {
      inserted (el, binding) {
        const roles = getStore('roles')
        if (!roles.includes(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}

export default hasRole

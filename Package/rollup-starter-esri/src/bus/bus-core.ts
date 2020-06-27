/** @format */
import Vue, { VueConstructor } from 'vue';

// declare module 'vue/types/vue' {
//   interface Vue {
//     $bus: any;
//   }
// }

/** 对象 { string:()=>{} } */
type EmitObjectBasedDeclaration = {
  [event: string]: Function;
};

function isEmitDeclaration(value: string | string[] | EmitObjectBasedDeclaration): value is EmitObjectBasedDeclaration {
  return (value as EmitObjectBasedDeclaration) instanceof Object;
}

class EventBus {
  private bus;

  eventMap: {};

  constructor(Vue: VueConstructor) {
    // if (!this.handles) {
    //   Object.defineProperty(this, 'handles', {
    //     value: {},
    //     enumerable: false,
    //   });
    // }
    this.bus = new Vue();
    this.eventMap = {};
  }

  emit(event: string, ...args: any[]): EventBus {
    this.bus.$emit(event, ...args);

    return this;
  }

  on(event: string | string[] | EmitObjectBasedDeclaration, callback?: Function): EventBus {
    if (!isEmitDeclaration(event)) {
      if (!callback) {
        throw new Error('[EventBus] Expected callback to be a function, got undefined');
      }
      this.eventMap[event] = callback;
      this.bus.$on(event, callback);
    } else {
      Object.keys(event).forEach((key) => this.bus.$on(key, event[key]));
    }

    return this;
  }

  off(event?: string | string[], callback?: Function): EventBus {
    if (!callback) {
      callback = this.eventMap[event];
    }
    this.bus.$off(event, callback);

    return this;
  }

  once(event: string | string[], callback: Function): EventBus {
    this.eventMap[event] = callback;
    this.bus.$once(event, callback);

    return this;
  }

  removeAll() {
    this.bus.$off();
  }

  /**
   * @deprecated. Use attach() instead.
   */
  register(name: string = '$bus'): EventBus {
    return this.attach(name);
  }

  attach(name: string = '$bus'): EventBus {
    Vue.prototype[name] = this;

    return this;
  }
}

export default EventBus;


https://github.com/ShuZhong/vue-event-bus/blob/master/src/index.ts
https://github.com/wowill/vue-event-bus/blob/master/index.js
https://github.com/tangdaohai/vue-happy-bus/blob/master/index.js


(new VueBus()).attach()

// VueBus is now available as a Vue's instance property
this.$vuebus.emit('userLoggedIn')

// Use a custom property name
(new VueBus()).attach('$bus')
this.$bus.emit('userLoggedIn')







bus.on('userLoggedIn', () => this.sayHello())
or an array of events:

bus.on(['userLoggedIn', 'userLoggedBackIn'], () => this.sayHello())
 

bus.on({
  userLoggedIn () {
    this.sayHello()
  },

  userLoggedOut () {
    this.sayGoodbye()
  }
})
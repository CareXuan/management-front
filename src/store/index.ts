import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const defaultState = { token: null, expand: true, username: 'admin' }

const store = new Vuex.Store({
  state: defaultState,
  getters: Object.keys(defaultState).reduce((o, key) => ({ ...o, [key]: (state: any) => state[key] }), {}),
  mutations: {
    update(state: any, payload: { name: string; value: any }) {
      state[payload.name] = payload.value
    },
    reset(state) {
      state = defaultState
    }
  }
})

export default store

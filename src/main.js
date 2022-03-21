import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import { v4 as uuidv4 } from 'uuid';

const store = createStore({
  state () {
    return {}
  },
  mutations: {
    add (state, { date, reminder }) {
      state[date] = [state[date] || [], { ...reminder, uuid: uuidv4() }].flat()
    },
    delete (state, { date, uuid }) {
      state[date] = state[date].filter(reminder => reminder.uuid !== uuid)
    }
  },
  getters: {
    getByDate: state => date => {
      return state[date]
    },
  }
})

const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')

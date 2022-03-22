import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import { v4 as uuidv4 } from "uuid";
import getWeather from "./services/weather";

const store = createStore({
  state() {
    return {};
  },
  mutations: {
    add(state, { date, reminder }) {
      state[date] = [state[date] || [], { ...reminder, uuid: uuidv4() }].flat();
    },
    delete(state, { date, uuid }) {
      state[date] = state[date].filter((reminder) => reminder.uuid !== uuid);
    },
    deleteAll(state, { date }) {
      state[date] = [];
    },
    edit(state, { date, reminder, uuid }) {
      state[date] = [
        ...state[date].filter((reminder) => reminder.uuid !== uuid),
        { ...reminder, uuid },
      ];
    },
  },
  actions: {
    async addReminder({ commit }, { date, reminder }) {
      try {
        const weather = await getWeather(reminder.city, date, reminder.start);
        await commit("add", { date, reminder: { ...reminder, weather } });
      } catch (error) {
        commit("add", { date, reminder });
      }
    },
  },
  getters: {
    getByDate: (state) => (date) => {
      return state[date]?.sort((a, b) => a.start - b.start);
    },
    getByUUID:
      (state) =>
      ({ date, uuid }) => {
        return state[date].find((reminder) => reminder.uuid === uuid);
      },
  },
});

const app = createApp(App);

app.use(router);

app.use(store);

app.mount("#app");

import { createStore } from "vuex";
import reminder from "./modules/reminder";

export default createStore({
  modules: {
    reminder,
  },
});

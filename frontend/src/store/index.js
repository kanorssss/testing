import { createStore } from "vuex";
import { mutations } from "./mutations.js";
import { storeEmployee } from "./actions";
// import { state } from "./state.js";

const store = createStore({
    mutations,
    actions: {
        storeEmployee,
    },
});

export default store;

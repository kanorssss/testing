import { createStore } from "vuex";
import { mutations } from "./mutations.js";
import { storeEmployee, getEmployees, updateEmployees } from "./actions";
import { state } from "./state.js";
// import { state } from "./state.js";

const store = createStore({
    state,
    mutations,
    actions: {
        storeEmployee,
        getEmployees,
        updateEmployees,
    },
});

export default store;

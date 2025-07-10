import axiosClient from "../axios.js";

export async function storeEmployee({ commit }, payload) {
    commit("SET_SAVING", true); // Indicate that a save operation is in progress
    commit("SET_ERROR", null); // Clear any previous errors

    try {
        let dataToSend = payload;
        const response = await axiosClient.post("employee", dataToSend);
        return response.data;
    } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || error.message);
    } finally {
        commit("SET_SAVING", false);
    }
}

//get employees
export async function getEmployees({ commit }) {
    //sonu umma
}
export default {
    storeEmployee,
    getEmployees,
};

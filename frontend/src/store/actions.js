import axiosClient from "../axios.js";

export async function storeEmployee({ commit, dispatch }, payload) {
    commit("SET_SAVING", true);
    commit("SET_ERROR", null);

    try {
        const response = await axiosClient.post("employee", payload);

        // refresh the list after saving for the table
        await dispatch("getEmployees");

        return response.data;
    } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || error.message);
        console.error(error);
    } finally {
        commit("SET_SAVING", false);
    }
}

//get employees
export async function getEmployees({ commit }) {
    commit("SET_LOADING", true); // Indicate that data is being loaded
    commit("SET_ERROR", null); // Clear any previous

    try {
        const response = await axiosClient.get("employee?per_page=10");
        commit("SET_EMPLOYEES", response.data.data); // Update the state with the fetched employees
        //PAGINATION
        commit("SET_PAGINATION", response.data.meta); // Set pagination metadata in the state
    } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || error.message); // Set the error message in the state
        console.log(error);
    } finally {
        commit("SET_LOADING", false); // Indicate that loading is complete
    }
}
export default {
    storeEmployee,
    getEmployees,
};

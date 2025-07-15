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
export async function getEmployees({ commit }, { page = 1, search = "" } = {}) {
    commit("SET_LOADING", true); // Indicate that data is being loaded
    commit("SET_ERROR", null); // Clear any previous

    try {
        // Fetch employees from the API
        const response = await axiosClient.get("employee", {
            params: {
                page,
                per_page: 10,
                search,
            },
        });
        commit("SET_EMPLOYEES", response.data.data);
        commit("SET_PAGINATION", response.data.meta);
    } catch (error) {
        commit("SET_ERROR", error.response?.data?.message || error.message); // Set the error message in the state
        console.log(error);
    } finally {
        commit("SET_LOADING", false); // Indicate that loading is complete
    }
}

export async function updateEmployees({ commit, dispatch }, payload) {
    commit("SET_SAVING", true);
    commit("SET_ERROR", true);

    try {
        const response = await axiosClient.put(
            `employee/${payload.id}`,
            payload
        );

        //refresh the table when its update
        await dispatch("getEmployees");
        //return response
        return response.data;
    } catch (err) {
        console.log(err);
        commit("SET_ERROR", message);
    } finally {
        commit("SET_SAVING", false);
    }
}

export async function deleteEmployees({ commit, dispatch }, id) {
    commit("SET_SAVING", true);
    try {
        await axiosClient.delete(`employee/${id}`);
        //refresh the table when its deleted
        await dispatch("getEmployees");
    } catch (error) {
        commit("SET_ERROR", error.response?.data?.error || error.message);
        throw error;
    } finally {
        commit("SET_SAVING", false);
    }
}
export default {
    storeEmployee,
    getEmployees,
    updateEmployees,
    deleteEmployees,
};

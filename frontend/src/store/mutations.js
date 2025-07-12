//these function update the state synchronously
export const mutations = {
    // Set the saving state to true or false
    SET_SAVING(state, saving) {
        state.saving = saving;
    },
    // Set an error message in the state
    SET_ERROR(state, error) {
        state.error = error;
    },
    // Set the list of employees
    SET_EMPLOYEES(state, data) {
        state.employees = data;
    },
    // Set the loading state
    SET_LOADING(state, status) {
        state.loading = status;
    },
    // Update the pagination metadata
    SET_PAGINATION(state, meta) {
        state.pagination = meta;
    },
};

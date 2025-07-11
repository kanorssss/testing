//these function update the state synchronously
export const mutations = {
    SET_SAVING(state, saving) {
        state.saving = saving;
    },
    SET_ERROR(state, error) {
        state.error = error;
    },
    SET_EMPLOYEES(state, data) {
        state.employees = data;
    },
    SET_LOADING(state, status) {
        state.loading = status;
    },
};

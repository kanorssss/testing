export const state = {
    employees: [],
    loading: false,
    error: null,
    saving: false,
    // Pagination metadata
    pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    },
};

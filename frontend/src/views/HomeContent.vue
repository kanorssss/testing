<template>
    <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-xl font-bold mb-4">Users</h2>

        <div class="mb-4">
            <button
                @click="showModal = true"
                class="bg-blue-500 text-white px-4 py-1 rounded"
            >
                Add New
            </button>
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search by name, email, or role"
                class="ml-4 px-2 py-1 border rounded"
            />
        </div>

        <!-- Table -->

        <div class="bg-white shadow rounded-lg overflow-hidden">
            <!-- Show Spinner When Loading -->
            <div v-if="spinner" class="p-6 flex justify-center">
                <SpinnerContent />
            </div>

            <!-- Table -->
            <table v-else class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="px-4 py-3 text-left text-sm font-medium text-gray-700"
                        >
                            Name
                        </th>
                        <th
                            class="px-4 py-3 text-left text-sm font-medium text-gray-700"
                        >
                            Email
                        </th>
                        <th
                            class="px-4 py-3 text-left text-sm font-medium text-gray-700"
                        >
                            Role
                        </th>
                        <th
                            class="px-4 py-3 text-left text-sm font-medium text-gray-700"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <!-- Show row while saving -->
                    <tr v-if="saving">
                        <td
                            colspan="4"
                            class="px-4 py-3 text-center text-sm text-gray-500"
                        >
                            Saving employee...
                        </td>
                    </tr>

                    <!-- Show empty state if no employees -->
                    <tr v-if="!saving && employees.length === 0">
                        <td
                            colspan="4"
                            class="px-4 py-3 text-center text-sm text-gray-400"
                        >
                            No employees found.
                        </td>
                    </tr>

                    <!-- List of employees -->
                    <tr
                        v-for="employee in filteredEmployees"
                        :key="employee.id"
                        class="hover:bg-gray-50"
                    >
                        <td class="px-4 py-3 text-sm text-gray-900">
                            {{ employee.name }}
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">
                            {{ employee.email }}
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">
                            {{ employee.position }}
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600 space-x-2">
                            <button
                                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                @click="openEditModal(employee)"
                            >
                                Edit
                            </button>
                            <button
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                @click="confirmDelete(employee)"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-600">
                Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </div>
            <div class="flex gap-2">
                <button
                    @click="changePage(pagination.current_page - 1)"
                    :disabled="pagination.current_page <= 1"
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    @click="changePage(pagination.current_page + 1)"
                    :disabled="pagination.current_page >= pagination.last_page"
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>

        <!-- Modals -->
        <ModalContent v-model="showModal" />
        <EditModalContent
            v-model="showModalEdit"
            :employee="selectedEmployee"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import ModalContent from "./ModalContent.vue";
import EditModalContent from "./EditModalContent.vue";
//add spinner
import SpinnerContent from "../components/SpinnerContent.vue";
//import debounce
import { debounce } from "lodash";

const store = useStore();
const showModal = ref(false);
const showModalEdit = ref(false);
const selectedEmployee = ref(null);

const employees = computed(() => store.state.employees);
const saving = computed(() => store.state.saving);
const pagination = computed(() => store.state.pagination);
const spinner = computed(() => store.state.loading);

//table
onMounted(() => {
    store.dispatch("getEmployees"); // default page 1
});
//end

// Function to change the page
const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.value.last_page) {
        store.dispatch("getEmployees", newPage);
    }
};
//end

// Function to open the modal for adding a new employee
const openEditModal = (employee) => {
    selectedEmployee.value = { ...employee };
    showModalEdit.value = true;
};
//end

// Function to confirm deletion of an employee
const confirmDelete = (employee) => {
    Swal.fire({
        title: `Delete ${employee.name}?`,
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e3342f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await store.dispatch("deleteEmployees", employee.id);
                Swal.fire(
                    "Deleted!",
                    `${employee.name} has been deleted.`,
                    "success"
                );
            } catch (error) {
                const errorMessage =
                    error.response?.data?.error ||
                    error.message ||
                    "Failed to delete employee";
                Swal.fire("Error!", errorMessage, "error");
            }
        }
    });
};
//end

// search
const searchQuery = ref("");
const filteredEmployees = computed(() => {
    // if no search query return the full employee list
    if (!searchQuery.value) return employees.value;

    //convert the query to lowercase for case sensitive
    const query = searchQuery.value.toLowerCase();
    return employees.value.filter(
        (emp) =>
            emp.name.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.position.toLowerCase().includes(query)
    );
});
//end
</script>

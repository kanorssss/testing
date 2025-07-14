<!-- src/views/HomeContent.vue -->
<template>
    <!-- <p>{{ page }}</p> -->
    <!-- <pre class="text-xs bg-gray-100 p-2 mt-2">{{ pagination }}</pre> -->
    <div class="max-w-4xl mx-auto p-6">
        <h2 class="text-xl font-bold mb-4">Users</h2>

        <div class="text-xl font-bold mb-4">
            <button
                @click="showModal = true"
                class="bg-blue-500 text-white px-4 py-1 rounded"
            >
                Add New
            </button>
        </div>

        <!-- Simple Table -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="w-full">
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
                    <tr v-if="saving">
                        <td
                            colspan="3"
                            class="px-4 py-3 text-center text-sm text-gray-500"
                        >
                            Saving employee...
                        </td>
                    </tr>
                    <tr
                        v-for="employee in employees"
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
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination buttons -->
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-600">
                Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </div>
            <div class="flex gap-2">
                <button
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    :disabled="pagination.current_page === 1"
                    @click="changePage(pagination.current_page - 1)"
                >
                    Previous
                </button>
                <button
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
                    :disabled="pagination.current_page === pagination.last_page"
                    @click="changePage(pagination.current_page + 1)"
                >
                    Next
                </button>
            </div>
        </div>

        <!-- Modal -->
        <ModalContent v-model="showModal" />

        <!-- Edit Modal -->
        <EditModalContent
            v-model="showModalEdit"
            :employee="selectedEmployee"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ModalContent from "./ModalContent.vue"; // tama na ang path
import EditModalContent from "./EditModalContent.vue"; // tama na ang path

import { useStore } from "vuex";

const showModal = ref(false);
// Define a ref for the selected employee to be edited
const selectedEmployee = ref(null);
// Function to open the edit modal with the selected employee
const showModalEdit = ref(false);

const store = useStore();

onMounted(() => {
    // Fetch employees when the component is mounted
    store.dispatch("getEmployees");
});
const employees = computed(() => store.state.employees); // Get employees from Vuex store
const saving = computed(() => store.state.saving); // Get saving state from Vuex store

//pagination
const pagination = computed(() => store.state.pagination); // Get pagination state from Vuex store

const loadPage = (page) => {
    store.dispatch("getEmployees", page);
};

const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.value.last_page) {
        loadPage(newPage);
    }
};

const handleLinkClick = (link) => {
    if (!link || !link.url) return;

    const url = new URL(link.url);
    const page = url.searchParams.get("page");

    if (page) {
        changePage(parseInt(page));
    }
};

// Function to open the modal for adding a new employee
const openEditModal = (employee) => {
    selectedEmployee.value = { ...employee }; // Create a copy of the employee object
    showModalEdit.value = true; // Open the edit modal
};
</script>

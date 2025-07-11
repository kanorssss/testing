<!-- src/views/HomeContent.vue -->
<template>
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
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination buttons -->
        <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-600">Page 1 of 1</div>
            <div class="flex gap-2">
                <button
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Previous
                </button>
                <button
                    class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>

        <!-- Modal -->
        <ModalContent v-model="showModal" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ModalContent from "./ModalContent.vue"; // tama na ang path
import { useStore } from "vuex";

const showModal = ref(false);

const store = useStore();
onMounted(() => {
    // Fetch employees when the component is mounted
    store.dispatch("getEmployees");
});
const employees = computed(() => store.state.employees); // Get employees from Vuex store
const saving = computed(() => store.state.saving); // Get saving state from Vuex store
</script>

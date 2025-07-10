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
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm text-gray-900">
                            John Doe
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">
                            john@example.com
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-600">Admin</td>
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
import { ref } from "vue";
import ModalContent from "./ModalContent.vue"; // tama na ang path

const showModal = ref(false);
</script>

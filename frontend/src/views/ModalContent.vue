<!-- src/components/EmployeeModal.vue -->
<template>
    <Teleport to="body">
        <div
            v-if="modelValue"
            class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition mt-1"
        >
            <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 class="text-xl font-semibold mb-4">Employee</h2>

                <form @submit.prevent="handleSubmit">
                    <input
                        v-model="form.name"
                        type="text"
                        placeholder="Name"
                        class="w-full border mb-3 px-3 py-2 rounded"
                        required
                    />
                    <input
                        v-model="form.email"
                        type="email"
                        placeholder="Email"
                        class="w-full border mb-3 px-3 py-2 rounded"
                        required
                    />
                    <input
                        v-model="form.position"
                        type="text"
                        placeholder="Position"
                        class="w-full border mb-3 px-3 py-2 rounded"
                    />

                    <div class="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            @click="close"
                            class="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { reactive, defineModel } from "vue";

//import store vuex
import { useStore } from "vuex";
const store = useStore();
const modelValue = defineModel({ type: Boolean, default: false });

const form = reactive({
    name: "",
    email: "",
    position: "",
});

function close() {
    modelValue.value = false;
}

// function handleSubmit() {
//     close();
// }

//clear all fields
function clearFields() {
    form.name = "";
    form.email = "";
    form.position = "";
}
async function handleSubmit() {
    try {
        await store.dispatch("storeEmployee", form);
        clearFields();
        close();
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <Teleport to="body">
        <div
            v-if="modelValue"
            class="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 transition mt-1"
        >
            <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <h2 class="text-xl font-semibold mb-4">Edit Employee</h2>

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
import { reactive, watch } from "vue";
import { useStore } from "vuex";

const props = defineProps({
    modelValue: Boolean, // Modal visibility
    employee: Object, // Employee data to edit
});

const emit = defineEmits(["update:modelValue"]);

const store = useStore();

//form data
const form = reactive({
    name: "",
    email: "",
    position: "",
});

watch(
    () => props.employee,
    (emp) => {
        // console.log("Employee data changed:", emp);
        if (emp) {
            form.name = emp.name || "";
            form.email = emp.email || "";
            form.position = emp.position || "";
        }
    },

    { immediate: true }
);

//close modal
const close = () => {
    emit("update:modelValue", false);
};

const handleSubmit = async () => {
    try {
        await store.dispatch("updateEmployees", {
            id: props.employee.id,
            name: form.name,
            email: form.email,
            position: form.email,
        });
        alert("ARAY KO!!1");
        emit("update:modelValue", false);
    } catch (err) {
        alert("ADDA ERROR MO LONG");
    }
};
</script>

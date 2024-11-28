<template>
    <div>
        <h1>Department Management</h1>
        <form @submit.prevent="addDepartment">
            <input v-model="newDepartment.name" placeholder="Department Name" required />
            <button type="submit">Add Department</button>
        </form>

        <ul>
            <li v-for="department in departments" :key="department.id">
                {{ department.name }} (ID: {{ department.id }})
                <button @click="editDepartment(department)">Edit</button>
                <button @click="removeDepartment(department.id)">Delete</button>
            </li>
        </ul>

        <div v-if="editingDepartment">
            <h2>Edit Department</h2>
            <form @submit.prevent="updateDepartment">
                <input v-model="editingDepartment.name" required />
                <button type="submit">Update Department</button>
                <button @click="cancelEdit">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import DepartmentService from '../services/DepartmentsService';

export default {
    data() {
        return {
            departments: [],
            newDepartment: { name: '' },
            editingDepartment: null
        };
    },
    created() {
        this.fetchDepartments();
    },
    methods: {
        fetchDepartments() {
            DepartmentService.getAllDepartments()
                .then(response => {
                    this.departments = response.data;
                })
                .catch(error => {
                    console.error("Error fetching departments:", error);
                });
        },
        addDepartment() {
            DepartmentService.createDepartment(this.newDepartment)
                .then(() => {
                    this.fetchDepartments();
                    this.newDepartment = { name: '' }; // Clear input
                })
                .catch(error => {
                    console.error("Error creating department:", error);
                });
        },
        editDepartment(department) {
            this.editingDepartment = { ...department }; // Create a copy for editing
        },
        updateDepartment() {
            DepartmentService.updateDepartment(this.editingDepartment.id, this.editingDepartment)
                .then(() => {
                    this.fetchDepartments();
                    this.editingDepartment = null; // Clear editing state
                })
                .catch(error => {
                    console.error("Error updating department:", error);
                });
        },
        removeDepartment(id) {
            DepartmentService.deleteDepartment(id)
                .then(() => {
                    this.fetchDepartments();
                })
                .catch(error => {
                    console.error("Error deleting department:", error);
                });
        },
        cancelEdit() {
            this.editingDepartment = null; // Clear editing state
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>

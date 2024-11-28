<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore, useUsersStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>
<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Employee Management</h1>

    <div class="card">
      <div class="card-header">
        <h2>Add Employee</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="addEmployee">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name">Name</label>
              <input v-model="newEmployee.name" id="name" class="form-control" placeholder="Enter Name" required />
            </div>
            <div class="col-md-6 mb-3">
              <label for="email">Email</label>
              <input v-model="newEmployee.email" id="email" class="form-control" placeholder="Enter Email" required />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="phone">Phone Number</label>
              <input v-model="newEmployee.phoneNumber" id="phone" class="form-control" placeholder="Enter Phone Number" />
            </div>
            <div class="col-md-6 mb-3">
              <label for="position">Position</label>
              <input v-model="newEmployee.position" id="position" class="form-control" placeholder="Enter Position" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="salary">Salary</label>
              <input v-model="newEmployee.salary" id="salary" type="number" class="form-control" placeholder="Enter Salary" required />
            </div>
            <div class="col-md-6 mb-3">
              <label for="address">Address</label>
              <input v-model="newEmployee.address" id="address" class="form-control" placeholder="Enter Address" />
            </div>
          </div>
        
          <div class="row mb-3">
          <div class="col-md-6">
          <h2 align="centers">Department</h2>    
        <select v-model="newEmployee.departmentId" id="department" class="form-control" required>
              <option value="" disabled>Select Department</option>
              <option v-for="department in departments" :key="department.id" :value="department.id">
                {{ department.name }}
              </option>
            </select>
          </div>
        </div>
          <hr class="my-4" />
          <h3>Payroll History</h3>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="payrollDate">Payroll Date</label>
              <input v-model="newPayrollHistory.date" id="payrollDate" type="date" class="form-control" />
            </div>
            <div class="col-md-6">
              <label for="payrollAmount">Payroll Amount</label>
              <input v-model="newPayrollHistory.amount" id="payrollAmount" type="number" class="form-control" placeholder="Enter Amount" />
            </div>
          </div>
          <button type="button" class="btn btn-secondary mb-2" @click="addPayrollHistory">Add Payroll History</button>
          <ul class="list-group mb-3">
            <li v-for="(history, index) in payrollHistories" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              {{ history.date }}: {{ history.amount }}
              <button class="btn btn-danger btn-sm" @click="removePayrollHistory(index)">Delete</button>
              <button class="btn btn-warning btn-sm" @click="showModalPayrollHistory(index)">Edit</button>
            </li>
          </ul>

          <hr class="my-4" />
          <h3>Vacancies</h3>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="vacancyStartDate">Start Date</label>
              <input v-model="newVacancy.startDate" id="vacancyStartDate" type="date" class="form-control" />
            </div>
            <div class="col-md-6">
              <label for="vacancyEndDate">End Date</label>
              <input v-model="newVacancy.endDate" id="vacancyEndDate" type="date" class="form-control" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="vacancyReason">Reason</label>
              <input v-model="newVacancy.reason" id="vacancyReason" class="form-control" placeholder="Enter Reason" />
            </div>
            <div class="col-md-6">
              <label for="vacancyStatus">Status</label>
              <select v-model="newVacancy.isApproved" id="vacancyStatus" class="form-control">
                <option :value="true">Approved</option>
                <option :value="false">Pending</option>
                <option :value="false">Refused</option>
              </select>
            </div>
          </div>
          <button type="button" class="btn btn-secondary mb-2" @click="addVacancy">Add Vacancy</button>
          <ul class="list-group mb-3">
            <li v-for="(vacancy, index) in vacancies" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              {{ vacancy.startDate }} to {{ vacancy.endDate }}: {{ vacancy.reason }} ({{ vacancy.isApproved ? 'Approved' : 'Pending' }})
              <button class="btn btn-danger btn-sm" @click="removeVacancy(index)">Delete</button>
              <button class="btn btn-warning btn-sm" @click="showModalVacancy(index)">Edit</button>

            </li>
          </ul>

          <hr class="my-4" />
          <h3>Absences</h3>
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="absenceStartDate">Start Date</label>
              <input v-model="newAbsence.startDate" id="absenceStartDate" type="date" class="form-control" />
            </div>
            <div class="col-md-6">
              <label for="absenceEndDate">End Date</label>
              <input v-model="newAbsence.endDate" id="absenceEndDate" type="date" class="form-control" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-12">
              <label for="absenceReason">Reason for Absence</label>
              <input v-model="newAbsence.reason" id="absenceReason" class="form-control" placeholder="Enter Reason" />
            </div>
          </div>
          <button type="button" class="btn btn-secondary mb-2" @click="addAbsence">Add Absence</button>
          <ul class="list-group mb-3">
            <li v-for="(absence, index) in absences" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              {{ absence.startDate }} to {{ absence.endDate }}: {{ absence.reason }}
              <button class="btn btn-danger btn-sm" @click="removeAbsence(index)">Delete</button>
              <button class="btn btn-warning btn-sm" @click="showModalAbsence(index)">Edit</button>
            </li>
          </ul>

          <div class="d-flex justify-content-between mt-3">
            <button type="submit" class="btn btn-success">Add Employee</button>
            <button type="button" class="btn btn-secondary" @click="resetForm">Reset</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="employees.length" class="mt-4">
      <h2>Employees List</h2>
      <ul class="list-group">
        <li v-for="employee in employees" :key="employee.id" class="list-group-item d-flex justify-content-between align-items-center">
        {{ employee.id }}    {{ employee.name }}           {{ employee.email }}              {{ employee.address }}

          <button class="btn btn-info btn-sm" @click="getEmployeeData(employee.id)">View Details</button>
        </li>
      </ul>
    </div>
    <template>
    <div class="container mt-4">
      <h1 class="text-center mb-4">Employee Management</h1>
  
      <!-- Button to open the modal dialog with employee details -->
      <div class="card flex justify-center">
        <Button label="Show Employee Details" @click="openEmployeeDialog" />
      </div>
  
      <!-- Employee Details Modal -->
      <Dialog v-model:visible="visible" modal header="Employee Details" :style="{ width: '30rem' }">
        <div v-if="selectedEmpData">
          <h3>Employee Details</h3>
          <div class="form-group mb-2">
          <label><strong>Name:</strong></label>
          <input type="text" class="form-control" v-model="selectedEmpData.name" readonly />
        </div>
        <div class="form-group mb-2">
          <label><strong>Email:</strong></label>
          <input type="email" class="form-control" v-model="selectedEmpData.email" readonly />
        </div>
        <div class="form-group mb-2">
          <label><strong>Phone Number:</strong></label>
          <input type="text" class="form-control" v-model="selectedEmpData.phoneNumber" readonly />
        </div>
        <div class="form-group mb-2">
          <label><strong>Position:</strong></label>
          <input type="text" class="form-control" v-model="selectedEmpData.position" readonly />
        </div>
        <div class="form-group mb-2">
          <label><strong>Salary:</strong></label>
          <input type="number" class="form-control" v-model="selectedEmpData.salary" readonly />
        </div>
        <div class="form-group mb-2">
          <label><strong>Address:</strong></label>
          <input type="text" class="form-control" v-model="selectedEmpData.address" readonly />
        </div>
          <p><strong>Department:</strong> {{ selectedEmpData.department?.name }}</p>
          <h4 class="mt-4">Payroll History</h4>
          <ul class="list-group mb-3">
            <li v-for="payroll in selectedEmpData.payrollHistories" :key="payroll.date" class="list-group-item">
              Date: {{ payroll.date }} - Amount: {{ payroll.amount }}
            </li>
          </ul>
  
          <!-- Absences -->
          <h4>Absences</h4>
        <ul class="list-group mb-3">
          <li v-for="absence in selectedEmpData.absences" :key="absence.startDate" class="list-group-item">
            {{ absence.startDate }} to {{ absence.endDate }} - Reason: {{ absence.reason }}
          </li>
        </ul>

        <!-- Vacancies Section -->
        <h4>Vacancies</h4>
        <ul class="list-group mb-3">
          <li v-for="vacancy in selectedEmpData.vacancies" :key="vacancy.startDate" class="list-group-item">
            {{ vacancy.startDate }} to {{ vacancy.endDate }} - Reason: {{ vacancy.reason }} - 
            Status: {{ vacancy.isApproved ? 'Approved' : 'Pending' }}
          </li>
        </ul>
        </div>
  
        <div class="flex justify-end gap-2 mt-4">
          <Button type="button" label="Close" @click="closeDialog" severity="secondary" />
        </div>
      </Dialog>
    </div>
  </template>
  
    <!-- Edit Profile Dialog -->
    <template>
  <Dialog v-model:visible="isDialogPayrolHistoryVisible" modal header="Edit Payroll History" :style="{ width: '25rem' }">
    <div class="form-group">
      <label for="payrollDate">Payroll Date</label>
      <InputText v-model="editPayrollHistory.date" id="payrollDate" type="date" class="form-control" />
    </div>
    <div class="form-group">
      <label for="payrollAmount">Payroll Amount</label>
      <InputText v-model="editPayrollHistory.amount" id="payrollAmount" type="nudember" class="form-control" placeholder="Enter Amount" />
    </div>
    <template #footer>
    <div class="d-flex justify-content-between">
      <!-- Cancel Button -->
      <Button 
        Button type="button" label="Cancel" severity="secondary"
        @click="isDialogPayrolHistoryVisible = false" 
       size="small" 
      />
      <!-- Save Button -->
      <Button label="Save" icon="pi pi-check" @click="savePayrollHistoryChanges" 
      iconPos="right" size="small" />
    </div>
  </template>
  </Dialog>
  <Dialog v-model:visible="isDialogVacancyVisible" modal header="Edit Vacancy" :style="{ width: '25rem' }">
      <div class="form-group">
        <label for="vacancyStartDate">Start Date</label>
        <InputText v-model="editVacancy.startDate" id="vacancyStartDate" type="date" class="form-control" />
      </div>
      <div class="form-group">
        <label for="vacancyEndDate">End Date</label>
        <InputText v-model="editVacancy.endDate" id="vacancyEndDate" type="date" class="form-control" />
      </div>
      <div class="form-group">
        <label for="vacancyReason">Reason</label>
        <InputText v-model="editVacancy.reason" id="vacancyReason" class="form-control" placeholder="Enter Reason" />
      </div>
      <template #footer>
        <div class="d-flex justify-content-between">
          <Button type="button" label="Cancel" severity="secondary" @click="isDialogVacancyVisible = false" size="small" />
          <Button label="Save" icon="pi pi-check" @click="saveVacancyChanges" iconPos="right" size="small" />
        </div>
      </template>
    </Dialog>

    <!-- Edit Absence Dialog -->
    <Dialog v-model:visible="isDialogAbsenceVisible" modal header="Edit Absence" :style="{ width: '25rem' }">
      <div class="form-group">
        <label for="absenceStartDate">Start Date</label>
        <InputText v-model="editAbsence.startDate" id="absenceStartDate" type="date" class="form-control" />
      </div>
      <div class="form-group">
        <label for="absenceEndDate">End Date</label>
        <InputText v-model="editAbsence.endDate" id="absenceEndDate" type="date" class="form-control" />
      </div>
      <div class="form-group">
        <label for="absenceReason">Reason</label>
        <InputText v-model="editAbsence.reason" id="absenceReason" class="form-control" placeholder="Enter Reason" />
      </div>
      <template #footer>
        <div class="d-flex justify-content-between">
          <Button type="button" label="Cancel" severity="secondary" @click="isDialogAbsenceVisible = false" size="small" />
          <Button label="Save" icon="pi pi-check" @click="saveAbsenceChanges" iconPos="right" size="small" />
        </div>
      </template>
    </Dialog>
</template>
</div>
</template>

<script>
import axios from 'axios';
import { ref } from "vue";
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  components: {
    Dialog,
    Button,
    InputText
  },
  data() {
    return {
      visible: ref(false),    // Visibility state for the dialog

      employees: [],
      selectedEmpData:null,
      departments: [],
      newEmployee: {
        name: '',
        email: '',
        phoneNumber: '',
        position: '',
        salary: 0,
        address: '',
        departmentId: '',
        department:{
          name:''
        }
      },
      editPayrollHistory: {
        date: '',
        amount: 0
      },
      editVacancy: {
        startDate: '',
        endDate: '',
        reason: '',
        isApproved: false
      },
      editAbsence: {
        startDate: '',
        endDate: '',
        reason: ''
      },
      selectedVacancyIndex: null,
      selectedAbsenceIndex: null,
      selectedPayrollIndex: null, // To keep track of which payroll entry is being edited
      isDialogPayrolHistoryVisible : ref(false),
      newPayrollHistory: {
        date: '',
        amount: 0
      },
      newVacancy: {
        startDate: '',
        endDate: '',
        reason: '',
        isApproved: false
      },
      newAbsence: {
        startDate: '',
        endDate: '',
        reason: ''
      },
      payrollHistories: [],
      vacancies: [],
      absences: [],
      isDialogVisible: false,
      selectedEmployee: {}
    };
  },
  methods: {
    async fetchEmployees() {
      try {
        const response = await axios.get('https://localhost:7059/api/employeeData');
        this.employees = response.data;
        console.log("ee",response.data)
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    async fetchDepartments() {
      try {
        const response = await axios.get('http://localhost:7059/api/departments');
        console.log("aaa",response)
        this.departments = response.data;
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    },
    async addEmployee() {
      const department = this.departments.find(dep => dep.id === this.newEmployee.departmentId);
      try {
        const employeeData = {
          department:department,
          ...this.newEmployee,
          payrollHistories: this.payrollHistories.map(ph => ({ ...ph })), // Ensure correct structure
          vacancies: this.vacancies.map(v => ({ ...v })), // Ensure correct structure
          absences: this.absences.map(a => ({ ...a })) // Ensure correct structure
        };
        const response = await axios.post('http://localhost:7059/api/employeeData', employeeData);
        this.employees.push(response.data);
        
        this.resetForm();
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    },
    resetForm() {
      this.newEmployee = {
        name: '',
        email: '',
        phoneNumber: '',
        position: '',
        salary: 0,
        address: '',
        departmentId: '',
         department:{
          name:''
        }
      };
      this.newPayrollHistory = {
        date: '',
        amount: 0
      };
      this.newVacancy = {
        startDate: '',
        endDate: '',
        reason: '',
        isApproved: false
      };
      
      this.newAbsence = {
        startDate: '',
        endDate: '',
        reason: ''
      };
      this.payrollHistories = [];
      this.vacancies = [];
      this.absences = [];
    },
    addPayrollHistory() {
      this.payrollHistories.push({ ...this.newPayrollHistory });
      this.newPayrollHistory = { date: '', amount: 0 };
    },
    removePayrollHistory(index) {
      this.payrollHistories.splice(index, 1);
    },
    showModalPayrollHistory(index) {
      console.log("Showing payroll history for:", this.payrollHistories[index]); 

      if (index >= 0 && index < this.payrollHistories.length) {
        this.selectedPayrollIndex = index;
        this.editPayrollHistory = { ...this.payrollHistories[index] };
        this.isDialogPayrolHistoryVisible = true;
    
        console.log("Modal opened:", this.isDialogPayrolHistoryVisible);
        console.log("Editing payroll history:", this.editPayrollHistory);
      } else {
        console.error("Invalid index for payroll history:", index);
      }
    },
    addVacancy() {
      this.vacancies.push({ ...this.newVacancy });
      this.newVacancy = { startDate: '', endDate: '', reason: '', isApproved: false };
    },
    removeVacancy(index) {
      this.vacancies.splice(index, 1);
    },
    showModalVacancy(index) {
      this.selectedVacancyIndex = index;
      this.editVacancy = { ...this.vacancies[index] };
      this.isDialogVacancyVisible = true;
    },
    saveVacancyChanges() {
      if (this.selectedVacancyIndex !== null) {
        this.vacancies.splice(this.selectedVacancyIndex, 1, { ...this.editVacancy });
        this.isDialogVacancyVisible = false;
      }
    },
    addAbsence() {
      this.absences.push({ ...this.newAbsence });
      this.newAbsence = { startDate: '', endDate: '', reason: '' };
    },
    removeAbsence(index) {
      this.absences.splice(index, 1);
    },
    showModalAbsence(index) {
      this.selectedAbsenceIndex = index;
      this.editAbsence = { ...this.absences[index] };
      this.isDialogAbsenceVisible = true;
    },
    saveAbsenceChanges() {
      if (this.selectedAbsenceIndex !== null) {
        this.absences.splice(this.selectedAbsenceIndex, 1, { ...this.editAbsence });
        this.isDialogAbsenceVisible = false;
      }
    },
    async getEmployeeData(id) {
      try {
        const response = await axios.get(`http://localhost:7059/api/employeeData/${id}`);
        this.selectedEmpData = response.data;
        this. openEmployeeDialog();
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    },
    openEmployeeDialog() {
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
      this.selectedEmpData = null;
    },
    viewDetails(employee) {
      this.selectedEmployee = { ...employee }; // Create a copy of the selected employee data
      this.isDialogVisible = true; // Show the dialog
    },
    savePayrollHistoryChanges() {
      if (this.selectedPayrollIndex !== null) {
        this.payrollHistories.splice(this.selectedPayrollIndex, 1, { ...this.editPayrollHistory });
        this.isDialogPayrolHistoryVisible = false; // Close the modal
      }
    },
    async saveChanges() {
      try {
        await axios.put(`https://localhost:7059/api/employee/${this.selectedEmployee.id}`, this.selectedEmployee);
        const index = this.employees.findIndex(emp => emp.id === this.selectedEmployee.id);
        if (index !== -1) {
          this.employees.splice(index, 1, this.selectedEmployee); // Update the employee in the list
        }
        this.isDialogVisible = false; // Close the dialog
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  },
  created() {
    this.fetchEmployees();
    this.fetchDepartments();
  }
};
</script>

<style>
.p-button-lg:hover {
  opacity: 0.85;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login'); // Redirect to login page after logging out
};
</script>

<template>
  <div class="app-container bg-light">
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <RouterLink to="/employee" class="nav-item nav-link">
          {{ authStore.user ? 'Employee Management' : 'Home' }}
        </RouterLink>
        <a @click="logout" class="nav-item nav-link">Logout</a>
      </div>
    </nav>

    <div class="container pt-4 pb-4">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import '@/assets/base.css';
</style>

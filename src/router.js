import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import EmployeeManagement from '@/components/EmployeeManagement.vue';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { path: '/login', component: LoginView },
        { path: '/employee', component: EmployeeManagement }

    ]
});

router.beforeEach( (to,from,next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth = useAuthStore();

    if (authRequired && !auth.user) {
        auth.returnUrl = to.fullPath;
        return next('/login');
    }
        // If the user is already logged in and tries to access the login page, redirect to the employee management page
        if (to.path === '/login' && auth.user) {
            return next('/employee');
        }
        next();

});

export default router; // Assurez-vous d'avoir cet export

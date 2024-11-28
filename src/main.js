import { createApp } from 'vue'
import { createPinia } from 'pinia'; // Add this import if missing
import router from './router'; // Make sure this path is correct based on your router setup
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
/* eslint-disable-next-line no-unused-vars */

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
console.log('Environment Variables:', import.meta.env);
console.log('Test Variable:', import.meta.env.VITE_TEST_VAR);
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);  // Use PrimeVue globally
app.mount('#app');

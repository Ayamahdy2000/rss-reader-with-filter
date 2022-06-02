import {
    createApp
} from 'vue'
import App from './App.vue'
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.scss"

createApp(App).use(bootstrap).mount('#app')
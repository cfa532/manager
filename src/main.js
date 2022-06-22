import { createApp } from 'vue'
import App from './App.vue'
// import Manager from './components/Manager.vue'
import './index.css'
// (function(global) {
const app = createApp(App)
app.provide("myGlobal", {"vue":{}})
// app.config.globalProperties.$global = {"vue": {}}    // works too
app.mount('#app')
// })(this || [eval][0]('this'));
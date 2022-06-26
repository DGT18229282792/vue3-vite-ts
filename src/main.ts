import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index';
import ElementPlus from "element-plus";
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import instance from './http/index'

let app = createApp(App)
app.config.globalProperties.$http = instance;

app.use(router)
.use(store)
.use(ElementPlus,{locale:zhCn})
.mount('#app')

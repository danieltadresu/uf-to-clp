import { createApp } from 'vue';
import { Button, PageHeader, Modal, Alert, Spin } from 'ant-design-vue';
import App from './App.vue';

const app = createApp(App);
app.config.productionTip = false;
app.use(Button);
app.use(PageHeader);
app.use(Modal);
app.use(Alert);
app.use(Spin);
app.mount('#app');


import Vue from 'vue';

import store from './store'
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import Vant from 'vant';

import router from './router'


Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(Antd);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue';

import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false
Vue.use(Antd);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

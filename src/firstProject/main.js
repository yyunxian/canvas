// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import 'jquery'
import 'default-passive-events'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en' //

import VCharts from 'v-charts' //图形统计表
Vue.use(VCharts)

Vue.config.productionTip = false


Vue.use(ElementUI, { locale })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueAzureUploader from "vue-azure-blob-upload";
Vue.use(VueAzureUploader);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

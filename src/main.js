import Vue from "vue";
import VueX from "vuex";

import cookie from "js-cookie";

import router from "./router";
// import routes from './config/PageRoutes'
import store from "./store/store";

// plugins
import VueRouter from "vue-router";
import VueBootstrap from "bootstrap-vue";
import VueNVD3 from "vue-nvd3";
import VueInsProgressBar from "vue-ins-progress-bar";
// import cookie from 'js-cookie'

import Vueditor from "@agametov/vueditor";
import VueHljs from "vue-hljs";
import VueSweetalert2 from "vue-sweetalert2";
import VueNotification from "vue-notification";
import VuePanel from "./plugins/panel/";
import VueDateTimePicker from "vue-bootstrap-datetimepicker";
import VueSelect from "vue-select";
import VueDatepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import VueMaskedInput from "vue-maskedinput";
import VueInputTag from "vue-input-tag";
import VueSlider from "vue-slider-component";
import VueGoodTable from "vue-good-table";
import VueFullCalendar from "vue-full-calendar";
import VueCountdown from "@chenfengyuan/vue-countdown";
import VueColorpicker from "vue-pop-colorpicker";
import VueCustomScrollbar from "vue-custom-scrollbar";
import VueApexCharts from "vue-apexcharts";
import DateRangePicker from "vue2-daterange-picker";
import VueGoodTablePlugin from "vue-good-table";

// plugins css
import "bootstrap-vue/dist/bootstrap-vue.css";
import "nvd3/build/nv.d3.min.css";
import "vue-event-calendar/dist/style.css";
import "vue-hljs/dist/vue-hljs.min.css";
import "@agametov/vueditor/dist/style/vueditor.min.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import "simple-line-icons/css/simple-line-icons.css";
import "flag-icon-css/css/flag-icon.min.css";
import "ionicons/dist/css/ionicons.min.css";
import "vue-good-table/dist/vue-good-table.css";
import "fullcalendar/dist/fullcalendar.css";
import "vue-select/dist/vue-select.css";
import "vue-slider-component/theme/antd.css";
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import "vue-good-table/dist/vue-good-table.css";
import "./assets/plugins/jvectormap-next/jquery-jvectormap.css";
import "./assets/plugins/bootstrap-datepicker/dist/css/bootstrap-datepicker.css";
import "./assets/plugins/gritter/css/jquery.gritter.css";

// color admin css
// import './assets/css/default/app.min.css'
import "./assets/css/facebook/font-google.css";
import "./assets/css/facebook/app.min.css";
import "./assets/css/facebook/theme/green.min.css";
import "./scss/vue.scss";
import "bootstrap-social/bootstrap-social.css";
import axios from "axios";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueX);
Vue.use(VueRouter);
Vue.use(VueBootstrap);
Vue.use(VueNVD3);
Vue.use(Vueditor);
Vue.use(VueHljs);
Vue.use(VueSweetalert2);
Vue.use(VueNotification);
Vue.use(VuePanel);
Vue.use(VueDateTimePicker);
Vue.use(VueGoodTable);
Vue.use(VueFullCalendar);
Vue.use(VueColorpicker);
Vue.use(VueGoodTablePlugin);
Vue.use(VueInsProgressBar, {
  position: "fixed",
  show: true,
  height: "3px",
});
Vue.component("v-select", VueSelect);
Vue.component("datepicker", VueDatepicker);
Vue.component("masked-input", VueMaskedInput);
Vue.component("input-tag", VueInputTag);
Vue.component("vue-slider", VueSlider);
Vue.component("vue-custom-scrollbar", VueCustomScrollbar);
Vue.component("apexchart", VueApexCharts);
Vue.component("date-range-picker", DateRangePicker);
Vue.component(VueCountdown.name, VueCountdown);

let auth = cookie.getJSON("userdata");

let axiosOptoins = {
  baseURL: "http://localhost:1337",
  timeout: 180000, // 3 menit
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${auth.access_token}`,
  },
};

Vue.prototype.$axios = axios.create(axiosOptoins);
if (cookie.getJSON("userdata") !== undefined) {
 
  store.commit("set_login", auth);
  
}

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

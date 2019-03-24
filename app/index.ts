import Vue from "vue";
import VueRouter from "vue-router";
import {VueWebpackResources} from "src/util/VueWebpackResources";

import App from "src/app/App.vue";

Vue.use(VueRouter);
Vue.use(VueWebpackResources, {preRequire: /\.(css)$/});

const vue = new Vue({
	router: new VueRouter(),
	render: createElement => createElement(App),
});

document.write(`<div id="app">`);
vue.$mount("#app");
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGrip,
  faPlus,
  faCirclePlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGrip);
library.add(faPlus);
library.add(faCirclePlus);
library.add(faXmark);

import store from "./store";

const app = createApp(App);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

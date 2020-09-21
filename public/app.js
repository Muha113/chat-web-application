import {Router} from "./js/Router.js";
import {routes} from "./js/routes.js";

document.addEventListener("DOMContentLoaded", () => {
    Router.init(routes);
});
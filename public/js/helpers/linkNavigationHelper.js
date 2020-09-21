import {Router} from "../Router.js";


export function linkNavigationHelper(event) {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    Router._instance.navigate(url);
}
import Utils from "./services/Utils.js";
import Error404 from "./views/pages/Error404.js";


export class Router {
    static _instance = null;
    routes;


    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', event => this._onPopState(event));

    }

    _onPopState(){
        if (this.currentPage && this.currentPage.onDestroy){
            this.currentPage.onDestroy();
        }

        this.loadPage(this.parseCurrentURL())
    }

    static init(routes) {
        if (Router._instance != null) {
            return Router._instance;
        }

        const router = new Router(routes);
        Router._instance = router;
        router._loadInitial();

        return router;
    }

    navigate(url) {
        if (this.currentPage && this.currentPage.onDestroy){
            this.currentPage.onDestroy();
        }
        
        history.pushState({}, "", url);

        let parseURL = this.parseCurrentURL()
        this.loadPage(parseURL)
    }

    async loadPage(url){
        const content = null || document.getElementById('main-page');

        this.currentPage = Error404
        for (const { path, page} of Router._instance.routes) {
            if (path === url){
                this.currentPage = page;
            }
        }

        content.innerHTML = await this.currentPage.render();
        await this.currentPage.after_render();
    }

    parseCurrentURL(){
        let request = Utils.parseRequestURL()
        let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
        return parsedURL
    }

    async _loadInitial(){
        let url = window.location.pathname;
        this.navigate(url)
    }
}
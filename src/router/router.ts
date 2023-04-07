import { Route, ComponentTemplate, urlInfo, appRoutes} from '@router/routes';

class Router {
    routes: Map<string, ComponentTemplate> | null;
    currentRoute: Route | null | undefined;

    constructor() {
        this.routes = new Map<string, ComponentTemplate>();
        this.currentRoute = null;

        for (const rout of appRoutes.values()) {
            this.#register(rout);
        }
    }

    /**
     * Можем указать url нового Rout-a как в переменной path, так и задать в самом объектк newRoute
     * @param {string} path - url нового rout-a
     * @param {Route} newRoute - объект нового rout-a имеет поля path: string, component: ComponentTemplate
     */
    #register(newRoute: Route) : boolean {
        if (newRoute.path && newRoute.component) {
            this.routes?.set(newRoute.path, newRoute.component);
            return true;
        }

        return false;
    }

    /**
     * Метод `route` находит маршрут, соответствующий текущему пути, и вызывает методы `componentWillUnmount` и `componentDidMount`
     * у текущего и нового компонентов соответственно.
     * @param {string} path - ccылка без домена и id
     */
    route(path: string) {
        if (this.currentRoute) {
            this.currentRoute.component?.componentWillUnmount();
        }

        const urlParams: urlInfo | null = this.#match(path);

        if (urlParams) {
            if (Object.keys(urlParams.dynamicParams).length !== 0) {
                console.log('!== 0')
                window.history.pushState({dynamicParam: urlParams.dynamicParams, path: window.location.pathname}, '', window.location.pathname); // TODO: path + urlParams.dynamicParams - динамический url
            } else {
                window.history.pushState({path: this.currentRoute?.path}, '', path); // 'content': this.currentRoute - статический url
            }
            this.currentRoute?.component?.componentDidMount();
        } else {
            console.log("error page"); // TODO: errorPage
        }
    }

    /**
     * метод для перехода на предыдущую страницу в истории браузера.
     */
    back() {
        if (window.history && window.history.back) {
            window.history.back();
        }
    }

    /**
     * метод для перехода на следующую страницу в истории браузера.
     */
    forward() {
        if (window.history && window.history.forward) {
            window.history.forward();
        }
    }

    /**
     * метод для перехода на страницу в истории браузера, находящуюся на расстоянии `n` от текущей страницы. 
     * Если `n` положительное число, то происходит переход вперед, если отрицательное - назад.
    */
    go(n: number) {
        window.history.go(n);
    }

    /**
     * строка, содержащая путь к маршруту, который нужно получить.
     * @param {string} path - строка, содержащая путь к маршруту, который нужно получить. 
     * @returns {Route} - возвращает объект маршрута, содержащий путь и обработчик.
     */
    getRoute(path: string) : Route {
        if (this.routes?.has(path)) {
            return {path: path, component: this.routes.get(path)};
        }

        return {path: 'not found', component: this.routes?.get('not found')}; // TODO: not found => /error/:id/ && component: errorComponent
    }

    getCurrentPath() : string {
        if (this.currentRoute) {
            return this.currentRoute?.path;
        }
        
        return 'not found'; // TODO: errorComponent
    }

    start() {
        this.currentRoute?.component?.componentWillUnmount();
        if (this.routes?.has(window.location.pathname)) {
            this.#setCurrentRoute(window.location.pathname);
            this.currentRoute?.component?.componentDidMount();
        }
    };

    /**
     * устанавливаем текуший Route
     * @param href - текущий путь 
     */
    #setCurrentRoute(href: string) {
        this.currentRoute = {path: href, component: this.routes?.get(href)};
    }

    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    #match(href: string) : urlInfo | null {
        const pathSegments = href.split("/");
        if (this.routes?.has(href)) {
            this.#setCurrentRoute(href);
        }
        
        const routeSegments = this.currentRoute?.path.split("/");
        if (pathSegments.length !== routeSegments?.length) {
            return null;
        }

        let params: {[key: string]: any} = {};

        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].charAt(0) === ":") {
                const paramName = routeSegments[i].substring(1);
                params[paramName] = pathSegments[i];
            } else if (routeSegments[i] !== pathSegments[i]) {
                return null;
            }
        }

        return {
            dynamicParams: params,
        };  
    }
}

export const router = new Router();

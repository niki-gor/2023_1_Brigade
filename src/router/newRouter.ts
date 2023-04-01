import { routes, Route, ComponentTemplate, urlInfo} from './routerConfig';

/**
 * 1) register(path, route: Route) - для добавления нового маршрута +
 * 2) removeRoute(path) - метод для удаления маршрута -
 * 3) getRoute(path)` - метод для получения маршрута по его пути. Принимает один аргумент: `path` -  Возвращает объект маршрута, содержащий путь и обработчик. +
 * 4) `route(path)` - метод для навигации по маршруту. Принимает один аргумент: `path` - строка, содержащая путь + 
 * 5) `start()` - метод для запуска прослушивания изменений URL-адреса и вызова соответствующих обработчиков маршрутов. Этот метод должен быть вызван после добавления всех маршрутов. +
 * 6) `back()` - метод для перехода на предыдущую страницу в истории браузера. +-
 * 7) `forward()` -  метод для перехода на следующую страницу в истории браузера. +-
 * 8) `go(n)` - метод для перехода на страницу в истории браузера, находящуюся на расстоянии `n` от текущей страницы. Если `n` положительное число, то происходит переход вперед, если отрицательное - назад.
 * 9) `getCurrentPath()` - метод для получения текущего пути.
 * 10) `notFound(route: Route)` - метод для установки обработчика, который будет вызываться, если нет пути
 */

class Router {
    routes: Map<string, ComponentTemplate>;
    currentIndex: number;
    currentRoute: Route | null | undefined;

    constructor(routes: Map<string, ComponentTemplate>) {
      this.routes = routes;
      this.currentIndex = -1;
      this.currentRoute = null;
    }

    /**
     * Можем указать url нового Rout-a как в переменной path, так и задать в самом объектк newRoute
     * @param {string} path - url нового rout-a
     * @param {Route} newRoute - объект нового rout-a имеет поля path: string, component: ComponentTemplate
     */
    register(path: string = '', newRoute: Route) : boolean {
        if (path) {
            newRoute.path = path;
        }
        
        if (newRoute.path && newRoute.component) {
            this.routes.set(newRoute.path, newRoute.component);
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
        const urlParams: urlInfo | null = this.match(path);
        if (urlParams) {
            if (this.currentRoute) {
                this.currentRoute.component?.componentWillUnmount();
            }

            this.currentRoute = {path: path, component: this.routes.get(path)};

            if (Object.keys(urlParams.dynamicParams).length !== 0) {
                const dynamicPath = Object.keys(urlParams.dynamicParams).reduce((accumulator, currentValue) => {
                    return accumulator + ':' + currentValue;
                }, path);
                window.history.pushState({dynamicParam: urlParams.dynamicParams, path: dynamicPath}, '', dynamicPath); // TODO: path + urlParams.dynamicParams - динамический url
            } else {
                window.history.pushState({path: this.currentRoute.path}, '', path); // 'content': this.currentRoute - статический url
            }
            
            this.currentRoute.component?.componentDidMount();
            ++this.currentIndex;
        } else {
            console.log("error page"); // TODO: errorPage
        }
    }

    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    match(href: string) : urlInfo | null {
        const pathSegments = href.split("/").filter((segment: string) => segment !== "");
        if (this.routes.has(href)) {
            this.currentRoute = {path: href, component: this.routes.get(href)}; // TODO: создать метод setCurrentRoute(path: string, component: ComponentTemplate | undefined);
        }
        
        const routeSegments = this.currentRoute?.path.split("/").filter((segment: string) => segment !== "");
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

    /**
     * метод для перехода на предыдущую страницу в истории браузера.
     */
    back() {
        --this.currentIndex;
        history.back();
    }

    /**
     * метод для перехода на следующую страницу в истории браузера.
     */
    forward() {
        ++this.currentIndex;
        history.forward();
    }

    /**
     * метод для перехода на страницу в истории браузера, находящуюся на расстоянии `n` от текущей страницы. 
     * Если `n` положительное число, то происходит переход вперед, если отрицательное - назад.
    */
    go(n: number) {
        this.currentIndex += n;
        history.go(n);
    }

    /**
     * строка, содержащая путь к маршруту, который нужно получить.
     * @param {string} path - строка, содержащая путь к маршруту, который нужно получить. 
     * @returns {Route} - возвращает объект маршрута, содержащий путь и обработчик.
     */
    getRoute(path: string) : Route {
        if (this.routes.has(path)) {
            return {path: path, component: this.routes.get(path)};    
        }

        return {path: 'not found', component: this.routes.get('not found')}; // TODO: not found => /error/:id/ && component: errorComponent
    }

    getCurrentPath() : string {
        if (this.currentRoute) {
            return this.currentRoute?.path;
        }
        
        return 'not found'; // TODO: errorComponent
    }

    start() {
        this.currentRoute?.component?.componentWillUnmount();

        if (this.routes.has(window.location.pathname)) {
            console.log('current url: ', window.location.pathname); // отладка
            this.currentRoute = {path: window.location.pathname, component: this.routes?.get(window.location.pathname)};
            this.currentRoute.component?.componentDidMount();
            ++this.currentIndex;
        }

        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.direction === 'forward') {
              this.forward();
            } else {
              this.back();
            }
        });          
    };
}

export const router = new Router(routes);

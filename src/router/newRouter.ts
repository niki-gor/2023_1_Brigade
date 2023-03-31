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

// import { createBrowserHistory } from 'history';
// import { store } from '@store/Store';
import { routes, Route, ComponentTemplate} from './routerConfig';


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
        console.log("route method has been called");
        const routeExist = this.routes.has(path);
        let id, separatorNumber;
        if (routeExist) {
            if (this.currentRoute) {
                this.currentRoute.component?.componentWillUnmount();
            }
            this.currentRoute = {path: path, component: this.routes.get(path)};

            separatorNumber = path.indexOf(':');
            if (separatorNumber != - 1) {
                id = path.slice(separatorNumber + 1); // TODO: извлечние не до конца строки, а до / скорее всего
                window.history.pushState({id}, '', path + id);
            } else {
                window.history.pushState({path: this.currentRoute.path}, '', path); // статический url 'content': this.currentRoute
            }
            
            this.currentRoute.component?.componentDidMount();
            ++this.currentIndex;
        } else {
            console.log("error page");
        }
    }

    /**
     * метод для перехода на предыдущую страницу в истории браузера.
     */
    back() {
        console.log('back method has been called');
        console.log('history state - prev path: ', window.history.state.path);
        console.log('curRoute path: ', this.currentRoute?.path);
        console.log('cur path: ', window.history.back());
        // if (this.currentIndex > 0) { // на второй странице
        //   --this.currentIndex;
        //   const prevPath = window.history.state.path;
        //   const routeExist = this.routes.has(prevPath);
        //   if (routeExist) {
        //     this.currentRoute = {path: prevPath, component: this.routes.get(prevPath)};
        //   }
        // //   history.back();
        // }
    }

    /**
     * метод для перехода на следующую страницу в истории браузера.
     */
    forward() {
        console.log('forward method has been called');
        ++this.currentIndex;
        history.forward();
        // if (history.forwardAvailable) {
        //     console.log('Next page exists');
        //   } else {
        //     console.log('Next page does not exist')
        // }
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
        
        return 'not found';
    }

    start() {
        // при запуске router-a window.history же пуста ?
        this.currentRoute?.component?.componentWillUnmount();

        if (this.routes.get(window.location.pathname)) {
            this.currentRoute = {path: window.location.pathname, component: this.routes?.get(window.location.pathname)};
            this.currentRoute.component?.componentDidMount();
            ++this.currentIndex;
        }

        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.back();
        });
        

        console.log("router start method has been called...");
        console.log("path: ", window.location.pathname);
    };
 
    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    match(href: string) : Object {
        const pathSegments = href.split("/").filter((segment: string) => segment !== "");
        const routeSegments = this.currentRoute?.path.split("/").filter((segment: string) => segment !== "");
        if (pathSegments.length !== routeSegments?.length) {
            return false;
        }

        let params: {[key: string]: any} = {};

        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].charAt(0) === ":") { // динамический параметр
                const paramName = routeSegments[i].substring(1);
                params[paramName] = pathSegments[i];
            } else if (routeSegments[i] !== pathSegments[i]) {
                return {};
            }
        }

        return {};      
    }
}

export const router = new Router(routes);

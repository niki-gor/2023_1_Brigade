/**
 * 1) register(path, route: Route) - для добавления нового маршрута
 * 2) removeRoute(path) - метод для удаления маршрута
 * 3) getRoute(path)` - метод для получения маршрута по его пути. Принимает один аргумент: `path` -  Возвращает объект маршрута, содержащий путь и обработчик.
 * 4) `navigate(path)` - метод для навигации по маршруту. Принимает один аргумент: `path` - строка, содержащая путь
 * 5) `start()` - метод для запуска прослушивания изменений URL-адреса и вызова соответствующих обработчиков маршрутов. Этот метод должен быть вызван после добавления всех маршрутов.
 * 6) `back()` - метод для перехода на предыдущую страницу в истории браузера.
 * 7) `forward()` -  метод для перехода на следующую страницу в истории браузера.
 * 8) `go(n)` - метод для перехода на страницу в истории браузера, находящуюся на расстоянии `n` от текущей страницы. Если `n` положительное число, то происходит переход вперед, если отрицательное - назад.
 * 9) `getCurrentPath()` - метод для получения текущего пути.
 * 10) `notFound(route: Route)` - метод для установки обработчика, который будет вызываться, если нет пути
 */



// import { createBrowserHistory } from 'history';
// import { store } from '@store/Store';
import { routes, Route, ComponentTemplate} from './routerConfig';

class Router {
    routes: Map<string, ComponentTemplate>;
    history: Object;
    currentIndex: number;
    currentRoute: Route | null | undefined;

    constructor(routes: Map<string, ComponentTemplate>) {
      this.routes = routes;
      this.history = window.history;
      this.currentIndex = -1;
      this.currentRoute = null;
    }

    /**
     * Можем указать url нового Rout-a как в переменной path, так и задать в самом объектк newRoute
     * @param {string} path - url нового rout-a
     * @param {Route} newRoute - объект нового rout-a имеет поля path: string, component: ComponentTemplate
     */
    register(path: string = '', newRoute: Route) : boolean {
        const currentPath = this.currentRoute?.path;

        if (path) {
            newRoute.path = path;
        }
        
        if (newRoute.path && newRoute.component) {
            this.routes.set(newRoute.path, newRoute.component);
            console.log("New route path: ", newRoute.path); // отладка
            window.history.pushState({}, '', newRoute.path);
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
            }
            window.history.pushState({id}, '', path + id);
            this.currentRoute.component?.componentDidMount();
            ++this.currentIndex;
        } else {
            console.log("error page");
        }
    }
  
    start() {
        if (this.routes.get('/')) {
            this.currentRoute = {path: '/', component: this.routes?.get('/')};
            window.history.pushState({}, '', '/');
            window.history.pushState({}, '', '/login');
        } else {
            const rootPath = this.routes.keys().next().value;
            this.currentRoute = {path: rootPath, component: this.routes?.get(rootPath)};
        }

        this.currentRoute.component?.componentDidMount();
        ++this.currentIndex;

        window.addEventListener('popstate', () => {
            console.log('URL changed:', window.location.href);
            // this.route(window.location.pathname);
        });
    };

    /**
     * метод для перехода на предыдущую страницу в истории браузера.
     */
    back() {
        if (this.currentIndex > 0) {
          --this.currentIndex;
          const path = history.state.path;
          const routeExist = this.routes.has(path);
          if (routeExist) {
            this.currentRoute = {path: path, component: this.routes.get(path)}
          }

          history.back();
        }
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

    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    // match(href: string) : boolean {
    //     const pathSegments = href.split("/").filter((segment: string) => segment !== "");
    //     const routeSegments = this.currentRoute?.path.split("/").filter((segment: string) => segment !== "");
    //     if (pathSegments.length !== routeSegments?.length) {
    //         return false;
    //     }

    //     const params = {};
    //     for (let i = 0; i < routeSegments.length; i++) {
    //         if (routeSegments[i].charAt(0) === ":") {
    //             const paramName = routeSegments[i].substring(1);
    //             params[paramName] = pathSegments[i];
    //         } else if (routeSegments[i] !== pathSegments[i]) {
    //             return false;
    //         }
    //     }

    //     this.currentRoute?.component?.componentDidMount(params);
    //     return true;      
    // }
}

export const router = new Router(routes);

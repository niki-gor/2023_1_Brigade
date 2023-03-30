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
import { hrefRegExp } from '@/config/regExp';

// const history = createBrowserHistory();

class Router {
    routes: Map<string, ComponentTemplate>;
    currentRoute: Route | null | undefined;

    constructor(routes: Map<string, ComponentTemplate>) {
      this.routes = routes;
      if (routes.get('/')) {
        this.currentRoute = {path: '/', component: routes?.get('/')};
      }
    }

    /**
     * Принимаем url нового rout-a в переменную path
     * Принимаем объекта нового route в переменную newRoute, 
     * можем указать url нового Rout-a как в переменной path, так и задать в самом объектк newRoute
     * @param {string} path - url нового rout-a
     * @param {Route} newRoute - объект нового rout-a имеет поля path: string, component: Class
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
     * строка, содержащая путь к маршруту, который нужно получить.
     * @param {string} path - 
     * @returns 
     */
    getRoute(path: string) : string {
        if (this.routes.has(path)) {
            return path;    
        }

        return "not found";
    }

    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    matchHref(href :string) {
        let newHref = href;
        if (newHref !== '/') {
            newHref = href.replace(hrefRegExp.endSlash, '');
        }
        let reg = new RegExp(`^${newHref.replace(hrefRegExp.idChats, hrefRegExp.chatProps)}?$`);

        let matchHref = newHref.match(reg);
        if (matchHref) {
            if (matchHref[1]) {
                matchHref[0] = matchHref[0].replace(hrefRegExp.idChats, '');
            } else {
                reg = new RegExp(`^${href.replace(hrefRegExp.idChats, hrefRegExp.chatProps)}?$`);
                matchHref = href.match(reg);
            }
        }
        return matchHref;
    }

    /**
     * Метод `route` находит маршрут, соответствующий текущему пути, и вызывает методы `componentWillUnmount` и `componentDidMount`
     * у текущего и нового компонентов соответственно.
     * @param {string} path - ccылка без домена и id
     */
    route(path: string) {
        const route = this.routes.has(path);
        let id, separatorNumber;
        if (route) {
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
        } else {
            console.log("error page");
        }
    }
  
    start() {
        window.addEventListener('popstate', () => {
            this.route(window.location.pathname);
        });
    };
}

export const router = new Router(routes);

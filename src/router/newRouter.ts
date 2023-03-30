import { createBrowserHistory } from 'history';
import { store } from '@store/Store';
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
    register(path: string = '', newRoute: Route) {
        if (path) {
            newRoute.path = path;
        }

        if (newRoute.path && newRoute.component) {
            this.routes.set(newRoute.path, newRoute.component);
        }

        console.log("нет данных для создания Rout-a");
    }

    getRoutes() : Map<string, ComponentTemplate> {
        return this.routes;
    }

    /**
     * Получает путь для обработчика render и динамические параметры
     * @param {string} href - ccылка без домена и id
     */
    // matchHref(href :string) {
    //     let newHref = href;
    //     if (newHref !== '/') {
    //         newHref = href.replace(hrefRegExp.endSlash, '');
    //     }
    //     let reg = new RegExp(`^${newHref.replace(hrefRegExp.idChats, hrefRegExp.chatProps)}?$`);

    //     let matchHref = newHref.match(reg);
    //     if (matchHref) {
    //         if (matchHref[1]) {
    //             matchHref[0] = matchHref[0].replace(hrefRegExp.idChats, '');
    //         } else {
    //             reg = new RegExp(`^${href.replace(hrefRegExp.idChats, hrefRegExp.chatProps)}?$`);
    //             matchHref = href.match(reg);
    //         }
    //     }
    //     return matchHref;
    // }

    /**
     * Метод `route` находит маршрут, соответствующий текущему пути, и вызывает методы `componentWillUnmount` и `componentDidMount`
     * у текущего и нового компонентов соответственно.
     * @param {string} path - ccылка без домена и id
     */
    // route(path: string) {
    //     const route = this.routes.find(route => route.path === path);
    //     if (route) {
    //         if (this.currentRoute) {
    //             this.currentRoute.component.componentWillUnmount();
    //         }
    //         this.currentRoute = route;
    //         window.history.pushState({}, '', path);
    //         route.component.componentDidMount();
    //     }
    // }
  
    // start() {
    //     window.addEventListener('popstate', () => {
    //         this.route(window.location.pathname);
    //     });

    //     window.addEventListener('', () => {

    //     });
    // };
}


export const router = new Router(routes);

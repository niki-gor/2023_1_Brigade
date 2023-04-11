import { SmartChat } from '@/containers/chat/chat';
import { Route, ComponentTemplate, appRoutes, getSmartChat, getSmartAddContactInGroup, dynamicUrlsRegex} from '@router/routes';

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

        const dynamicParams: string | null = this.#handleDynamicUrl(path);

        if (dynamicParams) {
            // this.currentRoute?.path = path
            if (this.currentRoute?.component) {
                // this.currentRoute.component = new SmartChat({
                    
                // })
            }

            if (path.includes('change')) {
                this.currentRoute = { path: path, component: getSmartAddContactInGroup(dynamicParams) };
            } else {
                this.currentRoute = { path: path, component: getSmartChat(dynamicParams) };
            }

            window.history.pushState({dynamicParam: dynamicParams, path: path}, '', path);
            this.currentRoute?.component?.componentDidMount();
        } else {
            window.history.pushState({path: this.currentRoute?.path}, '', path);
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
     * 
     * @param url - динамический url
     * @returns {String | null} - динамический параметр или null, если он отсутствует
     */
    #handleDynamicUrl(url: string) : string | null {
        for (let dynamicUrl of dynamicUrlsRegex) {
            const match = url.match(dynamicUrl);
            if (match) {
                const dynamicParam = match[1];
                return dynamicParam;
            }
        }

        return null;
    }
}

export const router = new Router();
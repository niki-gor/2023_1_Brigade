import { DYNAMIC } from '@/config/config';
import { SmartAddUserInGroup } from '@/containers/addUserInGroup/addUserInGroup';
import { SmartChat } from '@/containers/chat/chat';
import { store } from '@/store/store';
import { Route, ComponentTemplate, appRoutes, dynamicUrlsRegex, DynamicUrl, dynamicComponent} from '@router/routes';

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
        
        const dynamicUrl: DynamicUrl | null = this.#handleDynamicUrl(path);

        if (dynamicUrl) {
            if (this.routes?.has(dynamicUrl?.path)) {
                this.#setCurrentRoute(dynamicUrl.path);
            } else {
                if (this.#match(dynamicUrl.path) === dynamicComponent.chatId) {
                    this.currentRoute = {path: dynamicUrl.path, component: new SmartChat({...store.getState(), rootNode: DYNAMIC, chatId: dynamicUrl.dynamicParam})};
                } else if (this.#match(dynamicUrl.path) === dynamicComponent.chatAdd) {
                    this.currentRoute = {path: dynamicUrl.path, component: new SmartAddUserInGroup({...store.getState(), rootNode: DYNAMIC, chatId: dynamicUrl.dynamicParam})};
                }

                if (this.currentRoute) {
                    this.#register(this.currentRoute);
                }
            }

            window.history.pushState({dynamicParam: dynamicUrl.dynamicParam, path: dynamicUrl.path}, '', dynamicUrl.path);
            this.currentRoute?.component?.componentDidMount();
        } else {
            this.#setCurrentRoute(path);
            window.history.pushState({path: this.currentRoute?.path}, '', path);
            this.currentRoute?.component?.componentDidMount();
        }
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
        /**
         * Навигация по браузерной истории
         * Обрабатываем state-ы, которые прокидываем через pushState
         */
        window.addEventListener('popstate', (e) => {
            console.log('popstate handler');
            // console.log('history state: ', e.state);
            const path = window.location.pathname;
            const route = this.routes?.get(path);
            if (route) {
                this.currentRoute?.component?.componentWillUnmount();
                this.#setCurrentRoute(path);
                this.currentRoute?.component?.componentDidMount();
            } else {
                console.log('route not found')
            }
            console.log('current route: ', this.currentRoute);
        });
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
     * @returns {DynamicUrl | null} - объект с путем и днамичеким параметром или null, если он отсутствует
     */
    #handleDynamicUrl(url: string) : DynamicUrl | null {
        if (!this.routes?.get(url)) {
            for (let dynamicUrl of dynamicUrlsRegex) {
                const match = url.match(dynamicUrl);
                if (match && match[0] && match[1]) {
                    return {
                        path: match[0],
                        dynamicParam: match[1],
                    };
                }
            }
        }

        return null;
    }

    /**
     * находит с каким путем в массиве регулярок из конфига совпадает текущий дин. url.
     * @param path - динамический url
     * @returns {Number} - index динамического роута, если такого нет, то возвращает -1.
     */
    #match(path: string) : number {
        for (let i = 0; i < dynamicUrlsRegex.length; i++) {
            if (dynamicUrlsRegex[i].test(path)) {
                return i;
            }
        }
        return -1;
    }
}

export const router = new Router();

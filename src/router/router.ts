import { IComponent } from '@framework/component';

export interface Route {
    path: RegExp;
    component: (params: string[] | undefined) => IComponent | undefined;
}

export class Router {
    constructor(routes: Route[]) {
        this.routes = routes;
        this.currentRoute = undefined;
        this.currentDynamicParams = undefined;
        this.currentComponent = undefined;
    }

    public start = () => {
        window.addEventListener('popstate', (e) => {
            e.preventDefault();

            this.go(window.location.pathname);
        });

        // TODO: обработчики для передвижения мыши по экрану
        window.addEventListener('', (e) => {

        })
    };

    public route = (path: string) => {
        this.go(path);

        window.history.pushState(this.currentDynamicParams, '', path);
    };

    private match = (path: string) => {
        this.currentRoute = this.routes.find((route) => {
            const match = path.match(route.path);

            if (match) {
                this.currentDynamicParams = match.slice(1);

                return true;
            }

            return false;
        });
    };

    private go = (path: string) => {
        this.match(path);

        if (!this.currentRoute) {
            // TODO: отрендерить 404
            return;
        }

        // if (this.currentComponent && this.currentComponent instanceof this.currentRoute.component) {
        //     this.currentComponent.update(this.currentDynamicParams);
        //     return;
        // }

        this.currentComponent?.componentWillUnmount();
        this.currentComponent = this.currentRoute.component(
            this.currentDynamicParams
        );
        this.currentComponent?.componentDidMount();
    };

    private routes: Route[];
    private currentRoute: Route | undefined;
    private currentComponent: IComponent | undefined;
    private currentDynamicParams: string[] | undefined;
}

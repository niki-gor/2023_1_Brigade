import { routes } from '@router/routes';

class Router {
    #routes;

    // Определяем маршруты
    constructor(routes) {
        this.#routes = routes;
    }

    // Функция для отображения компонента
    #renderComponent(component) {
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.appendChild(component());
    }

    // Функция для поиска компонента по маршруту
    #findComponentByPath(path) {
        const route = routes.find((route) => route.path === path);
        return route ? route.component : null;
    }

    // Функция для обработки изменения URL
    #handleUrlChange() {
        const path = window.location.pathname;
        const component = this.#findComponentByPath(path);
        if (component) {
            this.#renderComponent(component);
        } else {
            const route = routes.find((route) => route.path === '/notfound');
            this.#renderComponent(route ? route.component : null);
        }
    }

    // Функция для добавления маршрута в историю браузера
    navigateTo(path) {
        window.history.pushState(null, null, path);
        this.handleUrlChange();
    }

    // Функция для замены текущего маршрута в истории браузера
    replacePath(path) {
        window.history.replaceState(null, null, path);
        this.handleUrlChange();
    }

    // Инициализация приложения
    init() {
        this.#handleUrlChange();
        // Обработчик события изменения URL
        window.addEventListener('popstate', this.handleUrlChange);
    }
}

// // Запуск приложения
// init();

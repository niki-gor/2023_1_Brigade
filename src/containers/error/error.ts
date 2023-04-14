import { DumbError } from "@/components/error/error";
import { DYNAMIC, ERROR, LOGIN, SIDEBAR, SIGNUP, STATIC } from "@/config/config";
import { router } from "@/router/router";
import { store } from "@/store/store";
import { Container } from "@containers/container";


export interface SmartError {
    state: {
        isSubscribed: boolean,
        domElements: {
            backBtn: HTMLInputElement | null,
        }
    }
}

/**
* Отрисовывает логин.
* Прокидывает actions в стору для логина
* Также подписывается на изменения статуса логина,
* для корректного рендера ошибки
*
*/
export class SmartError extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                backBtn: null,
            },
        };
    }

    /**
     * Рендерит ошибку
     */
    render() {
        if (this.state.isSubscribed && this.props.error) {
            const error = new DumbError({
                ...this.props,
            });

            // SIDEBAR.innerHTML = STATIC.innerHTML = DYNAMIC.innerHTML = '';
            // this.rootNode.insertAdjacentHTML("afterbegin", error.render());
            // LOGIN().remove();
            // SIGNUP().remove();
            // this.rootNode.insertAdjacentHTML("afterbegin", error.render());
            // TODO: сделать unmount всех текущих замоунитченных компоентов с помощью роутера
            this.rootNode.innerHTML = error.render();
            this.state.domElements.backBtn = document.querySelector('.error-back-button');
            this.state.domElements?.backBtn?.addEventListener('click', () => {
                this.handleClickBackBtn();
            });
        }
    }

    handleClickBackBtn() {
        this.componentWillUnmount();
        router.route(window.location.pathname);
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;

                this?.render();
            }));

            this.state.isSubscribed = true;
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;

            ERROR()?.remove();
        }
    }
}

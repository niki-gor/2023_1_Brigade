import { Component } from '@framework/component';

interface Props {}

interface State {
    isSubscribed: boolean;
    domElements: {
        backButton: HTMLInputElement | null;
    };
}

/**
 * Отрисовывает логин.
 * Прокидывает actions в стору для логина
 * Также подписывается на изменения статуса логина,
 * для корректного рендера ошибки
 *
 */
export class SmartError extends Component<Props, State> {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: Record<string, unknown>) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                backButton: null,
            },
        };
    }

    /**
     * Рендерит ошибку
     */
    render() {
        if (this.state.isSubscribed) {
        }
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            // this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: Record<string, unknown>) => {
            //     this.props = pr;

            //     this.render();
            // }));
            if (this.state.isSubscribed === false) {
                this.state.isSubscribed = true;
            }
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }
}

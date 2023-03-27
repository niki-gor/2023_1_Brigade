import { Container } from "@containers/container";

export interface Login {
    state: {
        statusLogin: number,
        isSubscribed: boolean,
    }
}

/**
* Отрисовывает логин.
* Прокидывает actions в стору для логина
* Также подписывается на изменения статуса логина,
* для корректного рендера ошибки
*
*/
export class Login extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            statusLogin: 0,
            isSubscribed: false,
        };
    }

    /**
     * Обрабатывает статус ответа
     * @param {number} userStatus - статус логина
     */
    handlerStatus(userStatus :number) {
    }

    /**
     * Рендерит логин
     */
    render() {
        // tik tak
        this.componentDidMount();
    }

    /**
     * Проверяет пользовательский ввод
     * @param {Element} form - форма логина
     * @param {Bool} keyup - режим проверки полей: true - по одному, false все
     */
    validateLogin(form :HTMLElement, keyup = false) {}

    /**
     * Навешивает обработчики на валидацию и на выход
     */
    componentDidMount() {}

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {}
}

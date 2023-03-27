import { Container } from "@containers/container";

export interface SignUp {
    state: {
        statusSignUp: number,
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
export class SignUp extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            statusSignUp: 0,
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
     * @param {Object} user - форма логина
     */
    validateSignUp(user : {}) {}

    /**
     * Навешивает обработчики на валидацию и на выход
     */
    componentDidMount() {}

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {}
}

import { Container } from "@containers/container";
import { DumbLogin } from "@/pages/login/login";
import { ValidationError } from "@/utils/validator";
import { store } from "@/store/store";

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
     */
    handleStatus() {

    }

    /**
     * Обрабатывает нажатие кнопки логина
     */
    handleClickLogin() {

    }

    /**
     * Обрабатывает нажатие кнопки перехода на страничку регистрации
     */
    handleClickMoveToSignUp() {

    }

    /**
     * Рендерит логин
     */
    render() {
        const LoginUI = new DumbLogin({ 
            ...this.props, 
            onClickLogin: this.handleClickLogin,
            onClickMoveToSignUp: this.handleClickMoveToSignUp,
            validate: this.validate,
            destroy: this.destroy,
        }); 

        this.rootNode.innerHTML = LoginUI.render();
        
        LoginUI.componentDidMount();
    }

    /**
     * Проверяет пользовательский ввод
     */
    validate() {}

    /**
     * Удаляет все подписки
     */
    destroy() {}
}

import { Container } from "@containers/container";
import { DumbLogin } from "@/pages/login/login";
import { checkEmail, checkPassword, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes } from "@/config/config";


export interface Login {
    state: {
        statusLogin: number,
        isSubscribed: boolean,
        isValid: boolean,
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
            isValid: false,
        };
    }

    /**
     * Обрабатывает статус ответа
     */
    handleStatus() {
        // TODO: after handleClickLogin
    }

    /**
     * Обрабатывает нажатие кнопки логина
     */
    handleClickLogin() {
        if (this.state.isValid) {
            // TODO: login request action
        }
    }

    /**
     * Обрабатывает нажатие кнопки перехода на страничку регистрации
     */
    handleClickMoveToSignUp() {
        // TODO: signup render action
    }

    /**
     * Проверяет пользовательский ввод почты
     */
    validateEmail() {
        const email = document.querySelector('.email') as HTMLInputElement;

        email.classList.remove('login-reg__input_error');
        addErrorToClass('', emailErrorTypes);

        const { isError, errorClass } = checkEmail(email?.value);

        if (isError) {
            email.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, emailErrorTypes);
            this.state.isValid = false;
            return;
        }

        this.state.isValid = true;
    }

    /**
     * Проверяет пользовательский ввод пароля
     */
    validatePassword() {
        const password = document.querySelector('.password') as HTMLInputElement;

        password.classList.remove('login-reg__input_error');
        addErrorToClass('', passwordErrorTypes);

        const { isError, errorClass } = checkPassword(password?.value);

        if (isError) {
            password.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, passwordErrorTypes);
            this.state.isValid = false;
            return;
        }

        this.state.isValid = true;
    }

    /**
     * Рендерит логин
     */
    render() {
        if (!this.state.isSubscribed) {
            this.unsubscribe = store.subscribe(this.render());
            this.state.isSubscribed = true;
        }

        const LoginUI = new DumbLogin({ 
            ...this.props, 
            onClickLogin: this.handleClickLogin,
            onClickMoveToSignUp: this.handleClickMoveToSignUp,
            validateEmail: this.validateEmail,
            validatePassword: this.validatePassword,
            destroy: this.destroy,
        }); 

        this.rootNode.innerHTML = LoginUI.render();
        
        LoginUI.componentDidMount();
    }

    /**
     * Удаляет все подписки
     */
    destroy() {
        this.unsubscribe();
    }
}

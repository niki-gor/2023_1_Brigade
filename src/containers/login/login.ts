import { Container } from "@containers/container";
import { DumbLogin } from "@/pages/login/login";
import { checkEmail, checkPassword, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes } from "@/config/config";
import { constantsOfActions } from "@/config/actions";


export interface Login {
    state: {
        statusLogin: number,
        isSubscribed: boolean,
        valid: {
            emailIsValid: boolean,
            passwordIsValid: boolean,
            isValid: () => boolean,
        },
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
            valid: {
                emailIsValid: false,
                passwordIsValid: false,
                isValid: () =>  {
                    return this.state.valid.emailIsValid && 
                           this.state.valid.passwordIsValid;
                }
            },
        };
    }

    /**
     * Рендерит логин
     */
    render() {
        const LoginUI = new DumbLogin({ 
            ...this.props,
        }); 

        this.rootNode.innerHTML = LoginUI.render();
    }

    /**
     * Показывает, что была введа незарегистрированная почта
     */
    invalidEmail() {
        document.querySelector('.email')?.classList.add('login-reg__input_error');
        document.querySelector('.invalid-email')?.classList.remove('invisible');
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(constantsOfActions.setState, this.render));
            this.unsubscribe.push(store.subscribe(constantsOfActions.invalidEmail, this.invalidEmail));

            this.state.isSubscribed = true;
        }

        this.render();

        document.querySelector('.login-but')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickLogin();
        });

        document.querySelector('.login-ques')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickMoveToSignUp();
        });

        document.querySelector('.email')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateEmail();
        });

        document.querySelector('.password')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validatePassword();
        });
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubscribed = false;
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
        if (this.state.valid.isValid()) {
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
            this.state.valid.emailIsValid = false;
            return;
        }

        this.state.valid.emailIsValid = true;
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
            this.state.valid.passwordIsValid = false;
            return;
        }

        this.state.valid.passwordIsValid = true;
    }
}

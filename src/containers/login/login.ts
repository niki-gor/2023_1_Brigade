import { Container } from "@containers/container";
import { DumbLogin } from "@/pages/login/login";
import { checkEmail, checkPassword, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes } from "@/config/config";
import { constantsOfActions } from "@/config/actions";
import { createLoginAction } from "@/actions/authActions";
import { createMoveToSignUpAction } from "@/actions/routeActions";


export interface SmartLogin {
    state: {
        isSubscribed: boolean,
        valid: {
            emailIsValid: boolean,
            passwordIsValid: boolean,
            isValid: () => boolean,
        },
        domElements: {
            email: HTMLInputElement | null,
            password: HTMLInputElement | null,
            loginButton: HTMLButtonElement | null,
            moveToSignUp: HTMLElement | null,
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
export class SmartLogin extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            valid: {
                emailIsValid: false,
                passwordIsValid: false,
                isValid: () =>  {
                    return this.state.valid.emailIsValid && 
                           this.state.valid.passwordIsValid;
                }
            },
            domElements: {
                email: null,
                password:  null,
                loginButton: null,
                moveToSignUp: null
            }
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
        this.state.domElements.email?.classList.add('login-reg__input_error');
        addErrorToClass('.invalid-email', emailErrorTypes);
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        this.render();

        this.state.domElements.loginButton = document.querySelector('.login-but');
        this.state.domElements.email?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickLogin();
        });

        this.state.domElements.moveToSignUp = document.querySelector('.login-ques');
        this.state.domElements.moveToSignUp?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickMoveToSignUp();
        });

        this.state.domElements.email = document.querySelector('.email');
        this.state.domElements.email?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateEmail();
        });

        this.state.domElements.password = document.querySelector('.password')
        this.state.domElements.password?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validatePassword();
        });

        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(constantsOfActions.setUser, this.render));
            this.unsubscribe.push(store.subscribe(constantsOfActions.invalidEmail, this.invalidEmail));

            this.state.isSubscribed = true;
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubscribed = false;
    }

    /**
     * Обрабатывает нажатие кнопки логина
     */
    handleClickLogin() {
        if (this.state.valid.isValid()) {
            const user = {
                email: this.state.domElements.email?.value,
                password: this.state.domElements.password?.value,
            } as anyObject;

            store.dispatch(createLoginAction(user))
        }
    }

    /**
     * Обрабатывает нажатие кнопки перехода на страничку регистрации
     */
    handleClickMoveToSignUp() {
        store.dispatch(createMoveToSignUpAction());
    }

    /**
     * Проверяет пользовательский ввод почты
     */
    validateEmail() {
        this.state.domElements.email?.classList.remove('login-reg__input_error');
        addErrorToClass('', emailErrorTypes);

        const { isError, errorClass } = checkEmail(this.state.domElements.email?.value ?? '');

        if (isError) {
            this.state.domElements.email?.classList.add('login-reg__input_error');
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
        this.state.domElements.password?.classList.remove('login-reg__input_error');
        addErrorToClass('', passwordErrorTypes);

        const { isError, errorClass } = checkPassword(this.state.domElements.password?.value ?? '');

        if (isError) {
            this.state.domElements.password?.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, passwordErrorTypes);
            this.state.valid.passwordIsValid = false;
            return;
        }

        this.state.valid.passwordIsValid = true;
    }
}

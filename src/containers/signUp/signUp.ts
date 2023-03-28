import { Container } from "@containers/container";
import { DumbSignUp } from "@/pages/signUp/signUp";
import { checkEmail, checkPassword, checkConfirmPassword, checkUsername, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes, confirmPasswordErrorTypes, usernameErrorTypes } from "@/config/config";
import { constantsOfActions } from "@/config/actions";
import { createSignUpAction } from "@/actions/authActions";
import { createMoveToLoginAction } from "@/actions/routeActions";


export interface Login {
    state: {
        statusLogin: number,
        isSubscribed: boolean,
        valid: {
            emailIsValid: boolean,
            passwordIsValid: boolean,
            confirmPasswordIsValid: boolean,
            usernameIsValid: boolean,
            isValid: () => boolean,
        },
        domElements: {
            email: HTMLInputElement | null,
            password: HTMLInputElement | null,
            confirmPassword: HTMLInputElement | null,
            username: HTMLInputElement | null,
            signUpButton: HTMLButtonElement | null,
            moveToLogin: HTMLElement | null,
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
                confirmPasswordIsValid: false,
                usernameIsValid: false,
                isValid: () => {
                    return this.state.valid.emailIsValid && 
                           this.state.valid.passwordIsValid && 
                           this.state.valid.confirmPasswordIsValid && 
                           this.state.valid.usernameIsValid;
                }
            },
            domElements: {
                email: null,
                password:  null,
                confirmPassword: null,
                username: null,
                signUpButton: null,
                moveToLogin: null
            }
        };
    }

    /**
     * Рендерит логин
     */
    render() {
        const LoginUI = new DumbSignUp({ 
            ...this.props,
        }); 

        this.rootNode.innerHTML = LoginUI.render();
    }

    /**
     * Показывает, что была введа занятая почта
     */
    occupiedEmail() {
        this.state.domElements.email?.classList.add('login-reg__input_error');
        document.querySelector('.occupied-email')?.classList.remove('invisible');
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        this.render();

        this.state.domElements.signUpButton = document.querySelector('.reg-but');
        this.state.domElements.signUpButton?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickSignUp();
        });

        this.state.domElements.moveToLogin = document.querySelector('.reg-ques');
        this.state.domElements.moveToLogin?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickMoveToLogin();
        });

        this.state.domElements.email = document.querySelector('.email');
        this.state.domElements.email?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateEmail();
        });

        this.state.domElements.password = document.querySelector('.password');
        this.state.domElements.password?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validatePassword();
        });

        this.state.domElements.confirmPassword = document.querySelector('.confirm-password');
        this.state.domElements.confirmPassword?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateConfirmPassword();
        });

        this.state.domElements.username = document.querySelector('.username');
        this.state.domElements.username?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateUsername();
        });

        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(constantsOfActions.setState, this.render));
            this.unsubscribe.push(store.subscribe(constantsOfActions.occupiedEmail, this.occupiedEmail));

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
    handleClickSignUp() {
        if (this.state.valid.isValid()) {
            const user = {
                email: this.state.domElements.email?.value,
                password: this.state.domElements.password?.value,
                username: this.state.domElements.username?.value,
            } as anyObject;

            if (this.state.valid.isValid()) {
                store.dispatch(createSignUpAction(user))
            }
        }
    }

    /**
     * Обрабатывает нажатие кнопки перехода на страничку регистрации
     */
    handleClickMoveToLogin() {
        store.dispatch(createMoveToLoginAction());
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

    /**
     * Проверяет пользовательский ввод подтверждения пароля
     */
    validateConfirmPassword() {
        this.state.domElements.confirmPassword?.classList.remove('login-reg__input_error');
        addErrorToClass('', confirmPasswordErrorTypes);

        const { isError, errorClass } = checkConfirmPassword(this.state.domElements.password?.value ?? '', this.state.domElements.confirmPassword?.value ?? '');

        if (isError) {
            this.state.domElements.confirmPassword?.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, passwordErrorTypes);
            this.state.valid.confirmPasswordIsValid = false;
            return;
        }

        this.state.valid.confirmPasswordIsValid = true;
    }

    /**
     * Проверяет пользовательский ввод имени
     */
    validateUsername() {
        this.state.domElements.username?.classList.remove('login-reg__input_error');
        addErrorToClass('', passwordErrorTypes);

        const { isError, errorClass } = checkUsername(this.state.domElements.username?.value ?? '');

        if (isError) {
            this.state.domElements.username?.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, passwordErrorTypes);
            this.state.valid.usernameIsValid = false;
            return;
        }

        this.state.valid.usernameIsValid = true;
    }
}

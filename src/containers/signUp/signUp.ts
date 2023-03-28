import { Container } from "@containers/container";
import { DumbSignUp } from "@/pages/signUp/signUp";
import { checkEmail, checkPassword, checkConfirmPassword, checkUsername, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes, confirmPasswordErrorTypes, usernameErrorTypes } from "@/config/config";


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
                           this.state.valid.usernameIsValid
                }
            },
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
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe = store.subscribe(this.render());
            this.state.isSubscribed = true;
        }

        this.render();

        document.querySelector('.login-but')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickSignUp();
        });

        document.querySelector('.login-ques')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.handleClickMoveToLogin();
        });

        document.querySelector('.email')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateEmail();
        });

        document.querySelector('.password')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validatePassword();
        });

        document.querySelector('.confirm-password')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateConfirmPassword();
        });

        document.querySelector('.username')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.validateUsername();
        });
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        this.unsubscribe();
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
    handleClickSignUp() {
        if (this.state.valid.isValid()) {
            // TODO: signup request action
        }
    }

    /**
     * Обрабатывает нажатие кнопки перехода на страничку регистрации
     */
    handleClickMoveToLogin() {
        // TODO: login render action
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

    /**
     * Проверяет пользовательский ввод подтверждения пароля
     */
    validateConfirmPassword() {
        const password = document.querySelector('.password') as HTMLInputElement;
        const confirmPassword = document.querySelector('.confirm-password') as HTMLInputElement;

        confirmPassword.classList.remove('login-reg__input_error');
        addErrorToClass('', confirmPasswordErrorTypes);

        const { isError, errorClass } = checkConfirmPassword(password?.value, confirmPassword?.value);

        if (isError) {
            confirmPassword.classList.add('login-reg__input_error');
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
        const username = document.querySelector('.username') as HTMLInputElement;

        username.classList.remove('login-reg__input_error');
        addErrorToClass('', passwordErrorTypes);

        const { isError, errorClass } = checkUsername(username?.value);

        if (isError) {
            username.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, passwordErrorTypes);
            this.state.valid.usernameIsValid = false;
            return;
        }

        this.state.valid.usernameIsValid = true;
    }
}

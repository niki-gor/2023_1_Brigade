import { Container } from "@containers/container";
import { DumbSignUp } from "@/pages/signUp/signUp";
import { checkEmail, checkPassword, checkConfirmPassword, checkNickname, addErrorToClass } from "@/utils/validator";
import { store } from "@/store/store";
import { emailErrorTypes, passwordErrorTypes, confirmPasswordErrorTypes, nicknameErrorTypes } from "@/config/errors";
import { createSignUpAction } from "@/actions/authActions";
import { createMoveToLoginAction, createRenderAction } from "@/actions/routeActions";
import { DYNAMIC, SIDEBAR, SIGNUP, STATIC } from "@/config/config";
import { Contacts } from "@containers/contacts/createContacts";
import { Sidebar } from "../sidebar/createSidebar";
import { Chats } from "../chatList/createChatList";


export interface SmartSignUp {
    state: {
        isSubscribed: boolean,
        valid: {
            emailIsValid: boolean,
            passwordIsValid: boolean,
            confirmPasswordIsValid: boolean,
            nicknameIsValid: boolean,
            isValid: () => boolean,
        },
        domElements: {
            email: HTMLInputElement | null,
            password: HTMLInputElement | null,
            confirmPassword: HTMLInputElement | null,
            nickname: HTMLInputElement | null,
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
*/
export class SmartSignUp extends Container {
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
                confirmPasswordIsValid: false,
                nicknameIsValid: false,
                isValid: () => {
                    return this.state.valid.emailIsValid && 
                           this.state.valid.passwordIsValid && 
                           this.state.valid.confirmPasswordIsValid && 
                           this.state.valid.nicknameIsValid;
                }
            },
            domElements: {
                email: null,
                password:  null,
                confirmPassword: null,
                nickname: null,
                signUpButton: null,
                moveToLogin: null
            }
        };
    }

    /**
     * Рендерит логин
     */
    render() {
        if (this.state.isSubscribed && !SIGNUP()) {
            const SignUpUI = new DumbSignUp({ 
                ...this.props,
            }); 

            SIDEBAR.innerHTML = STATIC.innerHTML = DYNAMIC.innerHTML = '';
            
            this.rootNode.insertAdjacentHTML("afterbegin", SignUpUI.render());

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

            this.state.domElements.nickname = document.querySelector('.nickname');
            this.state.domElements.nickname?.addEventListener('input', (e) => {
                e.preventDefault();

                this.validateNickname();
            });
        }
    }

    /**
     * Показывает, что была введа занятая почта
     */
    occupiedEmail() {
        if (this.state.isSubscribed && this.props?.occupiedEmail) {
            this.state.domElements.email?.classList.add('login-reg__input_error');
            addErrorToClass('occupied-email', emailErrorTypes);
        }
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => { 
                this.props = pr;

                this.render();
                this.occupiedEmail();
            }));

            this.state.isSubscribed = true;

            store.dispatch(createRenderAction());
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;

            SIGNUP().remove();
        }
    }

    /**
     * Обрабатывает нажатие кнопки логина
     */
    handleClickSignUp() {
        if (this.state.valid.isValid()) {
            const user = {
                nickname: this.state.domElements.nickname?.value,
                email: this.state.domElements.email?.value,
                password: this.state.domElements.password?.value,
            } as anyObject;

            store.dispatch(createSignUpAction(user))
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
    validateNickname() {
        this.state.domElements.nickname?.classList.remove('login-reg__input_error');
        addErrorToClass('', nicknameErrorTypes);

        const { isError, errorClass } = checkNickname(this.state.domElements.nickname?.value ?? '');

        if (isError) {
            this.state.domElements.nickname?.classList.add('login-reg__input_error');
            addErrorToClass(errorClass, nicknameErrorTypes);
            this.state.valid.nicknameIsValid = false;
            return;
        }

        this.state.valid.nicknameIsValid = true;
    }
}

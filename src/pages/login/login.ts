import { Page } from "@pages/page";
import template from "@pages/login/login.pug";
import { loginRegTopUI } from "@/components/ui/loginReg/top/top";
import { loginRegInputUI } from "@/components/ui/loginReg/input/input";
import { loginRegBottomUI } from "@/components/ui/loginReg/bottom/bottom";

export class DumbLogin extends Page {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            top: loginRegTopUI.renderTemplate({type: 'login'}),
            email: loginRegInputUI.renderTemplate({type: 'email'}),
            password: loginRegInputUI.renderTemplate({type: 'password'}),
            bottom: loginRegBottomUI.renderTemplate({type: 'login'}),
        });
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        document.querySelector('.login-but')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.props.onClickLogin();
        });

        document.querySelector('.login-ques')?.addEventListener('click', (e) => {
            e.preventDefault();

            this.props.onClickMoveToSignUp();
        });

        document.querySelector('.email')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.props.validateEmail();
        });

        document.querySelector('.password')?.addEventListener('input', (e) => {
            e.preventDefault();

            this.props.validatePassword();
        });
    }

    /**
     * Вызывает переданную функцию удаления подписки
     */
    componentWillUnmount() {
        this.props.destroy();
    }
}

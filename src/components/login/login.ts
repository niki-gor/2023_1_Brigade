import { Component } from '@/framework/component';
import template from '@components/login/login.pug';
import { loginRegTopUI } from '@components/ui/loginReg/top/top';
import { loginRegInputUI } from '@components/ui/loginReg/input/input';
import { loginRegBottomUI } from '@components/ui/loginReg/bottom/bottom';
import '@components/login/login.scss';
import { MobileInput } from '@/uikit/input/input';
import { emailErrorTypes, passwordErrorTypes } from '@/config/errors';
import { Button } from '@uikit/button/button';
import { Avatar } from '@/uikit/avatar/avatar';
import { Link } from '@/uikit/link-item/link-item';

interface Props {
    parent?: HTMLElement;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement | undefined;
    node: HTMLElement | undefined;
    email: MobileInput;
    password: MobileInput;
    loginButton: Button;
    avatar: Avatar;
    link: Link;
}

export class DumbLogin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state.parent = this.props?.parent;
        if (this.state.parent) {
            this.state.parent.innerHTML = this.render(); // TODO: добавить промис на render async/await
            this.state.isSubscribed = true;
        }

        this.state.avatar = new Avatar({
            parent: document.querySelector('.login') as HTMLElement,
            className: 'login-reg__top_photo',
            src: './assets/img/sticker.png',
            alt: 'Привет',
            caption: `Добро пожаловать, рад вас видеть!`,
            captionStyle: 'login-reg__top_welcome',
            captionBlockStyle: 'login-reg__top',
        });

        this.state.email = new MobileInput({
            parent: document.querySelector('.login') as HTMLElement, 
            className: 'input-container',
            placeholder: 'email',
            uniqClassName: 'email',
            errors: emailErrorTypes,
        });

        this.state.password = new MobileInput({
            parent: document.querySelector('.login') as HTMLElement,
            className: 'input-container',
            placeholder: 'password',
            uniqClassName: 'password',
            errors: passwordErrorTypes,
        });

        this.state.loginButton = new Button({
            parent: document.querySelector('.login') as HTMLElement,
            label: 'Войти',
            className: 'login__form__btn',
        });

        this.state.link = new Link({
            parent: document.querySelector('.login') as HTMLElement,
            className: 'login-reg-bottom__question login-ques',
            href: '/login',
            text: `Ещё нет аккаунта? Зарегистрироваться`,
        })
    }

    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    private render() : string {
        return template({
            top: loginRegTopUI.renderTemplate({ type: 'login' }),
            bottom: loginRegBottomUI.renderTemplate({ type: 'login' }),
        });
    }

    update() {
        
    }
}

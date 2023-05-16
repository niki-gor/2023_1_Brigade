import { Component } from '@/framework/component';
import template from '@components/login/login.pug';
import { loginRegTopUI } from '@components/ui/loginReg/top/top';
import { loginRegInputUI } from '@components/ui/loginReg/input/input';
import { loginRegBottomUI } from '@components/ui/loginReg/bottom/bottom';
import '@components/login/login.scss';
import { MobileInput } from '@components/ui/mobileInput/input';
import { emailErrorTypes, passwordErrorTypes } from '@/config/errors';

interface Props {
    parent?: HTMLElement;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement | undefined;
    node: HTMLElement | undefined;
    email: MobileInput;
    password: MobileInput;
}

export class DumbLogin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state.parent = this.props?.parent;
        if (this.state.parent) {
            this.state.parent.innerHTML = this.render(); // TODO: добавить промис на render async/await
            this.state.isSubscribed = true;
        }

        this.state.email = new MobileInput({
            parent: document.querySelector('.login') as HTMLElement, 
            className: 'input-container',
            placeholder: 'email',
            uniqClassName: 'email',
            errors: emailErrorTypes,
        })

        this.state.password = new MobileInput({
            parent: document.querySelector('.login') as HTMLElement,
            className: 'input-container',
            placeholder: 'password',
            uniqClassName: 'password',
            errors: passwordErrorTypes,
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

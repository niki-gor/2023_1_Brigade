import { Component } from '@/framework/component';
import template from '@components/login/login.pug';
import { loginRegTopUI } from '@components/ui/loginReg/top/top';
import { loginRegInputUI } from '@components/ui/loginReg/input/input';
import { loginRegBottomUI } from '@components/ui/loginReg/bottom/bottom';
import '@components/login/login.scss';
import { MobileInput } from '@components/ui/mobileInput/input';

interface Props {
    parent?: HTMLElement;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement | undefined;
    node: HTMLElement | undefined;
    email: HTMLElement;
    password: HTMLElement;
}

export class DumbLogin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parent: this.props.parent,
            node: undefined,
            email: new MobileInput({
                parent: document.querySelector('.login') as HTMLElement,
                className: 'input-container',
                placeholder: 'email',
                uniqClassName: 'email',
            }).render() as HTMLElement,
            password: new MobileInput({
                parent: document.querySelector('.login') as HTMLElement,
                className: 'input-container',
                placeholder: 'password',
                uniqClassName: 'password',
            }).render() as HTMLElement,
            isSubscribed: false,
        };

        console.log('parent: ', this.state.parent);

        // this.state?.parent?.insertAdjacentElement('afterend', this.state.email);
        // this.state?.email?.insertAdjacentElement('afterend', this.state.password);
    }

    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    render() : string {
        return template({
            top: loginRegTopUI.renderTemplate({ type: 'login' }),
            email: this.state.email?.outerHTML,
            password: this.state.password?.outerHTML,
            bottom: loginRegBottomUI.renderTemplate({ type: 'login' }),
        });
    }

    update() {
        
    }
}

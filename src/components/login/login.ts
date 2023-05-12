import { Component } from '@/framework/component';
import template from '@components/login/login.pug';
import { loginRegTopUI } from '@components/ui/loginReg/top/top';
import { loginRegInputUI } from '@components/ui/loginReg/input/input';
import { loginRegBottomUI } from '@components/ui/loginReg/bottom/bottom';
import '@components/login/login.scss';

interface Props {}

interface State {
    isSubscribed: boolean;
}

export class DumbLogin extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    render() {
        return template({
            top: loginRegTopUI.renderTemplate({ type: 'login' }),
            email: loginRegInputUI.renderTemplate({ type: 'email' }),
            password: loginRegInputUI.renderTemplate({ type: 'password' }),
            bottom: loginRegBottomUI.renderTemplate({ type: 'login' }),
        });
    }
}

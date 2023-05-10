import { Component } from '@/framework/component';
import template from '@components/signUp/signUp.pug';
import { loginRegTopUI } from '@components/ui/loginReg/top/top';
import { loginRegInputUI } from '@components/ui/loginReg/input/input';
import { loginRegBottomUI } from '@components/ui/loginReg/bottom/bottom';
import '@components/signUp/signUp.scss';

interface Props {}

interface State {
    isSubscribed: boolean;
}

export class DumbSignUp extends Component<Props, State> {
    constructor(props: Record<string, unknown>) {
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
            top: loginRegTopUI.renderTemplate({ type: 'reg' }),
            email: loginRegInputUI.renderTemplate({ type: 'email' }),
            nickname: loginRegInputUI.renderTemplate({ type: 'nickname' }),
            password: loginRegInputUI.renderTemplate({ type: 'password' }),
            confirmPassword: loginRegInputUI.renderTemplate({
                type: 'confirm password',
            }),
            bottom: loginRegBottomUI.renderTemplate({ type: 'reg' }),
        });
    }
}

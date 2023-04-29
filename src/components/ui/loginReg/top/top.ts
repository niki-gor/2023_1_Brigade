import { Component } from '@/framework/component';
import template from '@components/ui/loginReg/top/top.pug';
import '@components/ui/loginReg/top/top.css';

export class loginRegTopUI extends Component {
    static renderTemplate(args: Record<string, unknown>) {
        return template(args);
    }
}

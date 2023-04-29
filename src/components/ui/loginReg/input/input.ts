import { Component } from '@framework/component';
import template from '@components/ui/loginReg/input/input.pug';
import '@components/ui/loginReg/input/input.css';

export class loginRegInputUI extends Component<Props> {
    static renderTemplate(args: Record<string, unknown>) {
        return template(args);
    }
}

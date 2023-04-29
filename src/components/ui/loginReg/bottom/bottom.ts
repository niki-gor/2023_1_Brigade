import { Component } from '@framework/component';
import template from '@components/ui/loginReg/bottom/bottom.pug';
import '@components/ui/loginReg/bottom/bottom.css';

export class loginRegBottomUI extends Component<Props> {
    static renderTemplate(args: Record<string, unknown>) {
        return template(args);
    }
}

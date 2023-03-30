import { Component } from '@components/component'
import template from '@components/ui/loginReg/bottom/bottom.pug'
import '@components/ui/loginReg/bottom/bottom.css'

export class loginRegBottomUI extends Component {
    static renderTemplate(args: any) {
        return template(args);
    }
}

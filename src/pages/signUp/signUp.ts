import { Page } from "@pages/page";
import template from "@pages/signUp/signUp.pug";
import { loginRegTopUI } from "@/components/ui/loginReg/top/top";
import { loginRegInputUI } from "@/components/ui/loginReg/input/input";
import { loginRegBottomUI } from "@/components/ui/loginReg/bottom/bottom";
import "@/pages/signUp/signUp.css";

export class DumbSignUp extends Page {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            top: loginRegTopUI.renderTemplate({type: 'reg'}),
            email: loginRegInputUI.renderTemplate({type: 'email'}),
            username: loginRegInputUI.renderTemplate({type: 'username'}),
            password: loginRegInputUI.renderTemplate({type: 'password'}),
            confirmPassword: loginRegInputUI.renderTemplate({type: 'confirm password'}),
            bottom: loginRegBottomUI.renderTemplate({type: 'reg'}),
        });
    }
}

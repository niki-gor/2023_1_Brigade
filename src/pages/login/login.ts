import { Page } from "@pages/page";
import template from "@pages/login/login.pug";
import { loginRegTopUI } from "@/components/ui/loginReg/top/top";
import { loginRegInputUI } from "@/components/ui/loginReg/input/input";
import { loginRegBottomUI } from "@/components/ui/loginReg/bottom/bottom";

export class Login extends Page {
    static render() {
        return template({
            top: loginRegTopUI.renderTemplate({type: 'login'}),
            email: loginRegInputUI.renderTemplate({type: 'email'}),
            password: loginRegInputUI.renderTemplate({type: 'password'}),
            bottom: loginRegBottomUI.renderTemplate({type: 'login'}),
        });
    }
}

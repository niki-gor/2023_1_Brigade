import { Component } from "@components/component";
import template from "@components/ui/loginReg/top/top.pug";
import "@components/ui/loginReg/top/top.css";

export class loginRegTopUI extends Component {
    static renderTemplate(args: any) {
        return template(args);
    }
}

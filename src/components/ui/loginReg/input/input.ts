import { Component } from "@components/component";
import template from "@components/ui/loginReg/input/input.pug";
import "@components/ui/loginReg/input/input.css";

export class loginRegInputUI extends Component {
    static renderTemplate(args: any) {
        return template(args);
    }
}

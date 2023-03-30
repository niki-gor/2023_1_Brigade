import { Component } from "@/components/component";
import "@components/ui/header-input/header-input.scss";
import template from "@components/ui/header-input/header-input.pug";

export class headerInputUI extends Component {
    static renderTemplate(args: { headerInputText: string }) {
        return template(args);
    }
}

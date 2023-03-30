import { Component } from "@/components/component";
import "@components/ui/blue-button/blue-button.scss";
import template from "@components/ui/blue-button/blue-button.pug";

export class blueButtonUI extends Component {
    static renderTemplate(args : { className: string, buttonValue: string }) {
        return template(args);
    }
}

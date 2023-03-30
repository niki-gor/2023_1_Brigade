import { Component } from "@/components/component";
import "@components/ui/data-input/data-input.scss";
import template from "@components/ui/data-input/data-input.pug";

export class dataInputUI extends Component {
    static renderTemplate(args: { className: string, inputType: string, inputPlaceholder: string }) {
        return template(args);
    }
}

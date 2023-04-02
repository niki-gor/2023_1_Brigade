import { Component } from "@/components/component";
import template from "@components/contact/contact.pug";
import "@components/contact/contact.scss"

export class DumbContact extends Component {

    static renderTemplate(args: { avatar: any, nickname: string, status: string }) {
        return template(args);
    }
}

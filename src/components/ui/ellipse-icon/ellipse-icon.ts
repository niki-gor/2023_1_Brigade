import { Component } from "@/components/component";
import "@components/ui/ellipse-icon/ellipse-icon.scss";
import template from "@components/ui/ellipse-icon/ellipse-icon.pug";

export class ellipseIconUI extends Component {
    static renderTemplate(args: { imgSrc: string, altMsg: string }) {
        return template(args);
    }
}

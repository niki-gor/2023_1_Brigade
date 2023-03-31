import { UITool } from "@components/ui/uiTool";
import "@components/ui/ellipse-icon/ellipse-icon.scss";
import template from "@components/ui/ellipse-icon/ellipse-icon.pug";

export class ellipseIconUI extends UITool {
    static renderTemplate(args: { imgSrc: string, altMsg: string }) {
        return template(args);
    }
}

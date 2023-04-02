import { UITool } from "@components/ui/uiTool";
import "@components/ui/error-input/error-input.scss";
import template from "@components/ui/error-input/error-input.pug";


export class errorInputUI extends UITool {
    static renderTemplate(args: { className: string, message: string }) {
        return template(args);
    }
}

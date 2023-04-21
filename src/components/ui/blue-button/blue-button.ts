import { UITool } from "@components/ui/uiTool";
import "@components/ui/blue-button/blue-button.scss";
import template from "@components/ui/blue-button/blue-button.pug";

export class blueButtonUI extends UITool {
    static renderTemplate(args: { className: string; buttonValue: string }) {
        return template(args);
    }
}

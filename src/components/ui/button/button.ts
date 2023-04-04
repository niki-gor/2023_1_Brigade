import { UITool } from "../uiTool";
import template from "@components/ui/button/button.pug"

export class simpleButton extends UITool {
    static renderTemplate(args: {buttonValue: string}) {
        return template(args);
    }
}
import { UITool } from "@components/ui/uiTool";
import template from "@components/ui/button/button.pug"

export class svgButtonUI extends UITool {
    static renderTemplate(args: {svgClassName: string}) {
        return template(args);
    }
}
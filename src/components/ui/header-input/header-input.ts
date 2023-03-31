import { UITool } from "@components/ui/uiTool";
import "@components/ui/header-input/header-input.scss";
import template from "@components/ui/header-input/header-input.pug";

export class headerInputUI extends UITool {
    static renderTemplate(args: { headerInputText: string }) {
        return template(args);
    }
}

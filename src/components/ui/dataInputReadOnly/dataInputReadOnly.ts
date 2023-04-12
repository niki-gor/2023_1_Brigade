import { UITool } from "@components/ui/uiTool";
import "@components/ui/dataInputReadOnly/dataInputReadOnly.scss";
import template from "@components/ui/dataInputReadOnly/dataInputReadOnly.pug";


export class dataInputReadOnlyUI extends UITool {
    static renderTemplate(args: { className: string, inputType: string, inputPlaceholder: string, value: string }) {
        return template(args);
    }
}

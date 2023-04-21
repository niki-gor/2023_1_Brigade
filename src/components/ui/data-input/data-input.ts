import { UITool } from '@components/ui/uiTool';
import '@components/ui/data-input/data-input.scss';
import template from '@components/ui/data-input/data-input.pug';

export class dataInputUI extends UITool {
    static renderTemplate(args: {
        className: string;
        inputType: string;
        inputPlaceholder: string;
        value: string;
    }) {
        return template(args);
    }
}

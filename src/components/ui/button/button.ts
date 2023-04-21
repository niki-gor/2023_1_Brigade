import { UITool } from '@components/ui/uiTool';
import template from '@components/ui/button/button.pug';
import '@components/ui/button/button.scss';

export class svgButtonUI extends UITool {
    static renderTemplate(args: { svgClassName: string }) {
        return template(args);
    }
}

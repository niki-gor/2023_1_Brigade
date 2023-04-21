import template from '@components/ui/avatar/avatar.pug';
import '@components/ui/avatar/avatar.scss';
import { UITool } from '@components/ui/uiTool';

export class avatarUi extends UITool {
    static renderTemplate(args: {
        ClassName: string;
        PathToUserImage: string;
        Online: boolean;
    }) {
        return template(args);
    }
}

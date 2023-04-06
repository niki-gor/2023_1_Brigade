import template from "@components/ui/chatAvatar/chatAvatar.pug"
import "@components/ui/avatar/avatar.scss";
import { UITool } from "@components/ui/uiTool";


export class chatAvatarUi extends UITool {
    static renderTemplate(args: { ClassName: string, PathToUserImage: string, UserName: string, UserStatus: string, Online: boolean}) {
        return template(args);
    }
}

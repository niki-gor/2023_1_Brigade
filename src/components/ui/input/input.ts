import { Component } from "@/components/component";
import { svgButtonUI } from "@components/ui/button/button";
import template from "@components/ui/input/input.pug";
import { chatAvatarUi } from "@components/ui/chatAvatar/chatAvatar";

export class inputUi extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            UserImage: chatAvatarUi.renderTemplate({ClassName: 'input-message__user-avatar', PathToUserImage: this.props.pathToUserImage, UserName: '', UserStatus: '', Online: false}),
            SendBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
        });
    }
}

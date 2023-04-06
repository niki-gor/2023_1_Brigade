import template from "@components/chat/chat.pug"
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";
import { chatAvatarUi } from "@/components/ui/chatAvatar/chatAvatar";

export class DumbChat extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            MoreInfoBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__header__button-fourth'}),
            SendMessageBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({ClassName: 'header__companion__ava', PathToUserImage: this.props.pathToUserImage, UserName: this.props.userName, UserStatus: this.props.userStatus, Online: this.props.userOnline}),
            DialogUserAvatar: chatAvatarUi.renderTemplate({ClassName: 'dialog__companion__ava', PathToUserImage: this.props.pathToUserImage, UserName: this.props.userName, UserStatus: '', Online: this.props.userOnline}),
            DialogFriendAvatar: chatAvatarUi.renderTemplate({ClassName: 'dialog__companion__ava', PathToUserImage: this.props.friendAvatar, UserName: this.props.userName, UserStatus: '', Online: this.props.userOnline}),
            InputAvatar: chatAvatarUi.renderTemplate({ClassName: 'input-message__user-avatar', PathToUserImage: this.props.pathToUserImage, UserName: '', UserStatus: '', Online: false}),
        });
    }
}
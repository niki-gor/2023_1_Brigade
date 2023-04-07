import template from "@components/chat/chat.pug"
import "@components/chat/chat.scss";
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";
import { chatAvatarUi } from "@/components/ui/chatAvatar/chatAvatar";
import { inputUi } from "../ui/input/input";
import { Message } from "../message/message";

export class DumbChat extends Component {
    constructor(props: any) {
        super(props);
    }

    getMessageList() {
        // TODO: в цикле создавать message и пушить в массив message, который потом прокинем в pug.
        // const messages: Message[] = [];
        // for (let message of this.props.messages) {
        // }
        const message = new Message({
            messageSide: this.props.messageSide, 
            messageAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'message__avatar', 
                PathToUserImage: this.props.avatar,
                UserName: this.props.username,
                UserStatus: '',
                Online: this.props.userOnline}),
            messageBody: this.props.messageBody,
            username: this.props.username,
        }).render();

        return message;
        // TODO: return messages;
    }

    render() {
        return template({
            MoreInfoBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__header__button-fourth'}),
            SendMessageBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'header__companion__ava',
                PathToUserImage: this.props.avatar,
                UserName: this.props.username,
                UserStatus: this.props.userStatus,
                Online: this.props.userOnline
            }),
            MessageList: this.getMessageList(),
            Input: new inputUi({
                inputClassName: 'view-chat__input-message',
                userImage: chatAvatarUi.renderTemplate({ClassName: 'input-message__user-avatar', PathToUserImage: this.props.avatar, UserName: '', UserStatus: '', Online: false}),
                sendBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
                placeholder: 'Type something...',
            }).render()
        });
    }
}
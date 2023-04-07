import template from "@components/chat/chat.pug"
import "@components/chat/chat.scss";
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";
import { chatAvatarUi } from "@/components/ui/chatAvatar/chatAvatar";
import { avatarUi } from "@components/ui/avatar/avatar";
import { inputUi } from "@components/ui/input/input";
import { Message } from "@components/message/message";

export class DumbChat extends Component {
    constructor(props: any) {
        super(props);
    }

    getUsername() {

    }

    getMessageList() {
        const messages: Message[] = [];
        for (let message of this.props.chatData.messages) {
            messages.push(new Message({
                messageSide: this.props.messageSide, // TODO: если id == user.id true - отображаем слева
                messageAvatar: avatarUi.renderTemplate({
                    ClassName: 'message__avatar',
                    PathToUserImage: this.props.avatar, // todo: getUserAvatar
                    Online: false, // потом
                }),
                username: this.props.username, // // todo: getUsername
                messageContent: message.body, // ок
            }).render());
        }
        

        return messages;
    }

    render() {
        return template({
            MoreInfoBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__header__button-fourth'}),
            SendMessageBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'header__companion__ava',
                PathToUserImage: this.props.avatar, // todo: getFriendAvatar
                UserName: this.props.username, // todo: getUsername
                UserStatus: this.props.userStatus, // нет
                Online: this.props.userOnline, // нет
            }),
            MessageList: this.getMessageList(),
            Input: new inputUi({
                inputClassName: 'view-chat__input-message',
                userImage: chatAvatarUi.renderTemplate({
                    ClassName: 'input-message__user-avatar',
                    PathToUserImage: this.props.avatar, // todo: getUserAvatar
                    UserName: '', // не надо
                    UserStatus: '', // не надо
                    Online: false,
                }),
                sendBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
                placeholder: 'Type something...',
            }).render()
        });
    }
}
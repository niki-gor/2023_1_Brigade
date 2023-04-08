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

    #getMessageData(message: {id: number}) : {messageAvatar: string, messageUsername: string} {
        let messageAvatar;
        let messageUsername;
        for (let member of this.props.chatData.members) { // TODO: можно лучше
            if (member.id === message.id) {
                messageAvatar = member.avatar;
                messageUsername = member.username;
            }
        }

        return {
            messageAvatar: messageAvatar,
            messageUsername: messageUsername,
        }
    }

    getMessageList() {
        const messages: Message[] = [];
        for (let message of this.props.chatData.messages) {
            let messageData: {messageAvatar: string, messageUsername: string} = this.#getMessageData(message);
            messages.push(new Message({
                messageSide: message.author.id === this.props.userId,
                messageAvatar: avatarUi.renderTemplate({
                    ClassName: 'message__avatar',
                    PathToUserImage: messageData.messageAvatar, 
                    Online: false, // потом
                }),
                username: messageData.messageUsername,
                messageContent: message.body,
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
                PathToUserImage: this.props.chatAvatar,
                UserName: this.props.username,
                UserStatus: '', // нет this.props?.userStatus
                Online: false, // нет this.props?.userOnline,
            }),
            MessageList: this.getMessageList(),
            Input: new inputUi({
                inputClassName: 'view-chat__input-message',
                userImage: chatAvatarUi.renderTemplate({
                    ClassName: 'input-message__user-avatar',
                    PathToUserImage: this.props.userAvatar,
                    UserName: '', // не надо
                    UserStatus: '', // не надо
                    Online: false, // не надо
                }),
                sendBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
                placeholder: 'Type something...',
            }).render()
        });
    }
}
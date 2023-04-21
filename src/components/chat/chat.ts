import template from "@components/chat/chat.pug";
import "@components/chat/chat.scss";
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";
import { chatAvatarUi } from "@components/ui/chatAvatar/chatAvatar";
import { inputUi } from "@components/ui/input/input";
import { Message } from "@components/message/message";
import { ChatTypes } from "@config/enum";

export class DumbChat extends Component {
    constructor(props: any) {
        super(props);
    }

    #getMessageData(message: { author_id: number }): {
        messageAvatar: string;
        messageUsername: string;
    } {
        let messageAvatar;
        let messageUsername;
        for (const member of this.props.chatData.members) {
            // TODO: можно лучше
            if (member.id === message.author_id) {
                messageAvatar = member.avatar;
                messageUsername = member.nickname;
            }
        }

        return {
            messageAvatar: messageAvatar,
            messageUsername: messageUsername,
        };
    }

    getMessageList() {
        const messages: string[] = [];

        if (this.props.chatData?.messages) {
            for (const message of this.props.chatData.messages) {
                const messageData: {
                    messageAvatar: string;
                    messageUsername: string;
                } = this.#getMessageData(message);
                messages.push(
                    new Message({
                        messageSide: message.author_id === this.props.userId,
                        messageAvatar: messageData.messageAvatar,
                        username: messageData.messageUsername,
                        messageContent: message.body,
                    }).render()
                );
            }
        }

        return messages.reverse();
    }

    render() {
        let editBtnClassName = "";
        if (this.props.chatData.type === ChatTypes.Group) {
            editBtnClassName = "edit-chat";
        }
        return template({
            MoreInfoBtn: svgButtonUI.renderTemplate({
                svgClassName: editBtnClassName,
            }),
            SendMessageBtn: svgButtonUI.renderTemplate({
                svgClassName: "view-chat__send-message-button",
            }),
            DeleteChatBtn: svgButtonUI.renderTemplate({
                svgClassName: "delete-btn",
            }),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: "header__companion__ava",
                PathToUserImage: this.props.chatAvatar,
                UserName: this.props.chatTitle,
                UserStatus: "",
                Online: false, // нет this.props?.userOnline,
            }),
            MessageList: this.getMessageList(),
            Input: new inputUi({
                inputClassName: "view-chat__input-message",
                userImage: chatAvatarUi.renderTemplate({
                    ClassName: "input-message__user-avatar",
                    PathToUserImage: this.props.userAvatar,
                    UserName: "", // не надо
                    UserStatus: "", // не надо
                    Online: false, // не надо
                }),
                sendBtn: svgButtonUI.renderTemplate({
                    svgClassName: "view-chat__send-message-button",
                }),
                placeholder: "Type something...",
            }).render(),
        });
    }
}

import template from "@components/chat/chat.pug"
import "@components/chat/chat.scss";
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";
import { chatAvatarUi } from "@/components/ui/chatAvatar/chatAvatar";
import { inputUi } from "@components/ui/input/input";
import { Message } from "@components/message/message";
import { ChatTypes } from "@/config/enum";

export class DumbChat extends Component {
    constructor(props: any) {
        super(props);
        this.editBtn = '';
        this.deleteChatBtn = '';
        this.channelInput = '';
        this.subsribeBtnText = '';
    }

    private editBtn: string;
    private deleteChatBtn: string;
    private channelInput: string;
    private subsribeBtnText: string; // подписка на канал, если пользователь не подписан на канал

    #getMessageData(message: {author_id: number}) : {messageAvatar: string, messageUsername: string} {
        let messageAvatar;
        let messageUsername;
        for (let member of this.props.chatData.members) {
            if (member.id === message.author_id) {
                messageAvatar = member.avatar;
                messageUsername = member.nickname;
            }
        }

        return {
            messageAvatar: messageAvatar,
            messageUsername: messageUsername,
        }
    }

    getMessageList() {
        const messages: Message[] = [];
        
        if (this.props.chatData?.messages) {
            for (let message of this.props.chatData.messages) {
                let messageData: {messageAvatar: string, messageUsername: string} = this.#getMessageData(message);
                messages.push(new Message({
                    messageSide: message.author_id === this.props.userId,
                    messageAvatar: messageData.messageAvatar,
                    username: messageData.messageUsername,
                    messageContent: message.body,
                    id: message.id,
                }).render());
            }
        }

        return messages.reverse();
    }

    private checkRights() : boolean {
        if (this.props?.chatData?.master_id === this.props?.userId && 
        (this.props.chatData.type === ChatTypes.Group || this.props.chatData.type === ChatTypes.Channel)) {
            return true;
        }

        return false;
    }

    /**
     * 
     * @returns {Boolean} - состоит ли пользователь в канале
     */
    private isMember() : boolean {
        for (let member of this.props?.chatData?.members) {
            if (member.id == this.props.userId) {
                return true;
            }
        }

        return false;
    }

    render() {
        // this.props.chatData.master_id = 1; // подписчик
        
        if (this.isMember()) {
            this.subsribeBtnText = 'Unsubscribe';
        } else {
            this.subsribeBtnText = 'Subscribe';
        }

        if (this.checkRights()) {
            this.editBtn = 'edit-chat';
            this.deleteChatBtn = 'delete-btn';
            this.channelInput =  new inputUi({
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
            }).render();
            this.subsribeBtnText = '';
        }
        
        return template({
            EditBtn: svgButtonUI.renderTemplate({svgClassName: this.editBtn}),
            SendMessageBtn: svgButtonUI.renderTemplate({svgClassName: 'view-chat__send-message-button'}),
            DeleteChatBtn: svgButtonUI.renderTemplate({svgClassName: this.deleteChatBtn}),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'header__companion__ava',
                PathToUserImage: this.props.chatAvatar,
                UserName: this.props.chatTitle,
                UserStatus: '',
                Online: false, // нет this.props?.userOnline,
            }),
            Subscriberes: this.props?.chatData?.members?.length,
            MessageList: this.getMessageList(),
            Input: this.channelInput,
            SubsribeBtnText: this.subsribeBtnText,
        });
    }
}

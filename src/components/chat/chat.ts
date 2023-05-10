import template from '@components/chat/chat.pug';
import '@components/chat/chat.scss';
import { Component } from '@framework/component';
import { svgButtonUI } from '@components/ui/button/button';
import { chatAvatarUi } from '@components/ui/chatAvatar/chatAvatar';
import { inputUI } from '@components/ui/input/input';
import { DumpMessage } from '@components/message/message';
import { ChatTypes } from '@config/enum';

interface Props {
    chatData: OpenedChat;
    chatAvatar: string;
    chatTitle: string;
    userId: number;
    userAvatar: string;
}

interface State {
    isRendered: boolean;
}

export class DumbChat extends Component<Props, State> {
    private editBtn: string;
    private deleteChatBtn: string;
    private channelInput: string;
    private subscribeBtnText: string;
    private leaveGroup: string;

    constructor(props: Props) {
        super(props);
        this.editBtn = '';
        this.deleteChatBtn = '';
        this.channelInput = '';
        this.subscribeBtnText = '';
        this.leaveGroup = '';
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    #getMessageData(message: { author_id: number }): {
        messageAvatar: string;
        messageUsername: string;
    } {
        let messageAvatar;
        let messageUsername;
        for (const member of this.props.chatData.members) {
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
        const messages: Message[] = [];

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
                        id: message.id,
                    }).render()
                );
            }
        }

        return messages.reverse();
    }

    private checkRights(): boolean {
        if (this.props?.chatData?.master_id === this.props?.userId) {
            return true;
        }

        return false;
    }

    /**
     *
     * @returns {Boolean} - состоит ли пользователь в канале
     */
    private isMember(): boolean {
        for (const member of this.props?.chatData?.members) {
            if (member.id == this.props.userId) {
                return true;
            }
        }

        return false;
    }

    render() {
        if (this.isMember()) {
            this.subscribeBtnText = 'Unsubscribe';
        } else {
            this.subscribeBtnText = 'Subscribe';
        }

        if (
            this.checkRights() &&
            this.props.chatData.type !== ChatTypes.Dialog
        ) {
            this.editBtn = 'edit-chat';
            this.deleteChatBtn = 'delete-btn';
            this.channelInput = new inputUi({
                inputClassName: 'view-chat__input-message',
                userImage: chatAvatarUi.renderTemplate({
                    ClassName: 'input-message__user-avatar',
                    PathToUserImage: this.props.userAvatar,
                    UserName: '',
                    UserStatus: '',
                    Online: false,
                }),
                sendBtn: svgButtonUI.renderTemplate({
                    svgClassName: 'view-chat__send-message-button',
                }),
                placeholder: 'Type something...',
            }).render();
        }

        if (this.props.chatData.type !== ChatTypes.Channel) {
            if (this.props.chatData.type !== ChatTypes.Group) {
                this.deleteChatBtn = 'delete-btn';
            }
            this.channelInput = new inputUi({
                inputClassName: 'view-chat__input-message',
                userImage: chatAvatarUi.renderTemplate({
                    ClassName: 'input-message__user-avatar',
                    PathToUserImage: this.props.userAvatar,
                    UserName: '',
                    UserStatus: '',
                    Online: false,
                }),
                sendBtn: svgButtonUI.renderTemplate({
                    svgClassName: 'view-chat__send-message-button',
                }),
                placeholder: 'Type something...',
            }).render();
            this.subscribeBtnText = '';
        }

        if (this.props.chatData.type === ChatTypes.Group) {
            this.leaveGroup = 'Выйти из группы';
        }

        return template({
            EditBtn: svgButtonUI.renderTemplate({ svgClassName: this.editBtn }),
            LeaveGroupBtn: this.leaveGroup,
            SendMessageBtn: svgButtonUI.renderTemplate({
                svgClassName: 'view-chat__send-message-button',
            }),
            DeleteChatBtn: svgButtonUI.renderTemplate({
                svgClassName: this.deleteChatBtn,
            }),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'header__companion__ava',
                PathToUserImage: this.props?.chatAvatar ?? '',
                UserName: this.props?.chatTitle ?? '',
                UserStatus: '',
                Online: false,
            }),
            Subscriberes: this.props?.chatData?.members?.length,
            MessageList: this.getMessageList(),
            Input: this.channelInput,
            SubsribeBtnText: this.subscribeBtnText,
        });
    }
}

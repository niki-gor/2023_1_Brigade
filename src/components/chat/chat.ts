import template from '@components/chat/chat.pug';
import '@components/chat/chat.scss';
import { Component } from '@framework/component';
import { svgButtonUI } from '@/components/ui/icon/button';
import { chatAvatarUi } from '@components/ui/chatAvatar/chatAvatar';
import { inputUI } from '@components/ui/input/input';
import { ChatTypes } from '@config/enum';
import { DumbMessage } from '@/uikit/message/message';

interface Props {
    chatData: OpenedChat;
    chatAvatar: string;
    chatTitle: string;
    userId: number;
    userAvatar: string;
    onDeleteMessage: (message: DumbMessage) => void;
    onEditMessage: (message: DumbMessage) => void;
}

interface State {
    isMounted: boolean;
    messages: DumbMessage[];
}

export class DumbChat extends Component<Props, State> {
    private editBtn: string;
    private deleteChatBtn: string;
    private channelInput: string;
    private subscribeBtnText: string;
    private leaveGroup: string;

    constructor(props: Props) {
        super(props);
        this.state = {
            isMounted: false,
            messages: [],
        };
        this.editBtn = '';
        this.deleteChatBtn = '';
        this.channelInput = '';
        this.subscribeBtnText = '';
        this.leaveGroup = '';
    }

    destroy() {}

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    getAuthor(message: Message) {
        let author: User | undefined = undefined;

        for (const member of this.props.chatData.members) {
            if (
                member.id === message.author_id &&
                member.id !== this.props.userId
            ) {
                author = member;
            }
        }

        return author;
    }

    addMessage(parent: HTMLElement, message: Message) {
        const messageComponent = new DumbMessage({
            message,
            hookMessage: (state) => {
                let updatedMessage: Message | undefined = undefined;

                state.openedChat?.messages.forEach((newMessage) => {
                    if (newMessage.id === message.id) {
                        updatedMessage = newMessage;
                    }
                });

                return updatedMessage;
            },
            user:
                this.props.chatData.type === ChatTypes.Group
                    ? this.getAuthor(message)
                    : undefined,
            place: message.author_id === this.props.userId ? 'right' : 'left',
            onDelete:
                message.author_id === this.props.userId
                    ? this.props.onDeleteMessage
                    : undefined,
            onEdit:
                message.author_id === this.props.userId
                    ? this.props.onEditMessage
                    : undefined,
            parent,
        });

        this.state.messages.push(messageComponent);
    }

    setMessageList() {
        const parent = document.querySelector(
            '.view-chat__messages'
        ) as HTMLElement;
        if (!parent) {
            return;
        }

        this.props.chatData?.messages?.forEach((message) => {
            this.addMessage(parent, message);
        });
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
            this.channelInput = new inputUI({
                inputClassName: 'view-chat__input-message',
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
            this.channelInput = new inputUI({
                inputClassName: 'view-chat__input-message',
                sendBtn: svgButtonUI.renderTemplate({
                    svgClassName: 'view-chat__send-message-button',
                }),
                placeholder: 'Сообщение',
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
            // MessageList: this.getMessageList(),
            Input: this.channelInput,
            SubsribeBtnText: this.subscribeBtnText,
        });
    }
}

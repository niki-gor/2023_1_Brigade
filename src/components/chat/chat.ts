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
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    #getMessageData(message: { author_id: number }): {
        messageAvatar: string | undefined;
        messageUsername: string | undefined;
    } {
        let messageAvatar;
        let messageUsername;
        this.props?.chatData.members.forEach((member) => {
            // TODO: можно лучше
            if (member.id === message.author_id) {
                messageAvatar = member.avatar;
                messageUsername = member.nickname;
            }
        });

        return {
            messageAvatar: messageAvatar,
            messageUsername: messageUsername,
        };
    }

    getMessageList() {
        const messages: string[] = [];

        if (this.props?.chatData?.messages) {
            this.props.chatData.messages.forEach((message) => {
                const messageData = this.#getMessageData(message);

                messages.push(
                    new DumpMessage({
                        messageSide: message.author_id === this.props?.userId,
                        messageAvatar: messageData.messageAvatar ?? '',
                        username: messageData.messageUsername ?? '',
                        messageContent: message.body,
                    }).render()
                );
            });
        }

        return messages.reverse();
    }

    render() {
        let editBtnClassName = '';
        if (this.props?.chatData.type === ChatTypes.Group) {
            editBtnClassName = 'edit-chat';
        }
        return template({
            MoreInfoBtn: svgButtonUI.renderTemplate({
                svgClassName: editBtnClassName,
            }),
            SendMessageBtn: svgButtonUI.renderTemplate({
                svgClassName: 'view-chat__send-message-button',
            }),
            DeleteChatBtn: svgButtonUI.renderTemplate({
                svgClassName: 'delete-btn',
            }),
            HeaderUserAvatar: chatAvatarUi.renderTemplate({
                ClassName: 'header__companion__ava',
                PathToUserImage: this.props?.chatAvatar ?? '',
                UserName: this.props?.chatTitle ?? '',
                UserStatus: '',
                Online: false, // нет this.props?.userOnline,
            }),
            MessageList: this.getMessageList(),
            Input: new inputUI({
                inputClassName: 'view-chat__input-message',
                sendBtn: svgButtonUI.renderTemplate({
                    svgClassName: 'view-chat__send-message-button',
                }),
                placeholder: 'Type something...',
            }).render(),
        });
    }
}

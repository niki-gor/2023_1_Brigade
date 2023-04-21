import { Container } from '@containers/container';
import { store } from '@store/store';
import { DumbChat } from '@components/chat/chat';
import { Message } from '@components/message/message';
import {
    createDeleteChatAction,
    createGetChatsAction,
    createGetOneChatAction,
    createIsNotRenderedAction,
} from '@actions/chatActions';
import { getWs } from '@utils/ws';
import { DumbEmptyDynamicPage } from '@components/emptyDynamicPage/emptyDynamicPage';
import { createMoveToEditChatAction } from '@actions/routeActions';
import { ChatTypes } from '@config/enum';
import { DYNAMIC } from '@config/config';

export interface SmartChat {
    state: {
        isSubscribed: boolean;
        domElements: {
            submitBtn: HTMLElement | null;
            deleteBtn: HTMLElement | null;
            editBtn: HTMLElement | null;
        };
    };

    chatId: string | undefined;
}

/**
 * Отрисовывает чаты.
 * Прокидывает actions стору для создания диалога, удаление диалога, открыть диалог для просмотра
 * Также подписывается на изменения активного диалога и статуса диалога
 */
export class SmartChat extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: AnyObject) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                submitBtn: null,
                deleteBtn: null,
                editBtn: null,
            },
        };
        this.chatId = props.chatId;
        this.rootNode = DYNAMIC;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed && this.chatId) {
            if (this.props?.openedChat?.isNotRendered) {
                const chat = new DumbChat({
                    chatData: this.props.openedChat,
                    userId: this.props?.user?.id,
                    userAvatar: this.props?.user?.avatar,
                    nickname: this.props?.user?.nickname,
                    chatAvatar: this.props?.openedChat?.avatar,
                    chatTitle: this.props?.openedChat?.title,
                });

                this.rootNode.innerHTML = chat.render();

                this.state.domElements.submitBtn = document.querySelector(
                    '.view-chat__send-message-button'
                );
                this.state.domElements.deleteBtn =
                    document.querySelector('.delete-btn');
                this.state.domElements.editBtn =
                    document.querySelector('.edit-btn');

                const input = document.querySelector(
                    '.input-message__text-field__in'
                ) as HTMLInputElement;

                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && e.target) {
                        this.handleClickSendButton(input);
                    }
                });

                this.state.domElements.submitBtn?.addEventListener(
                    'click',
                    (e) => {
                        e.preventDefault();

                        this.handleClickSendButton(input);
                    }
                );

                this.state.domElements.deleteBtn?.addEventListener(
                    'click',
                    (e) => {
                        e.preventDefault();

                        this.handleClickDeleteButton();
                    }
                );

                if (this.props.openedChat.type === ChatTypes.Group) {
                    this.state.domElements.editBtn?.addEventListener(
                        'click',
                        () => {
                            this.handleClickEditButton();
                        }
                    );
                }

                store.dispatch(createIsNotRenderedAction());

                const uns = this.unsubscribe.pop();
                if (uns) {
                    uns();
                }
            }
        }
    }

    renderIncomingMessage(message: AnyObject) {
        for (const member of this.props?.openedChat.members) {
            if (member.id === message.author_id) {
                const newMessage = new DOMParser().parseFromString(
                    new Message({
                        messageSide: false,
                        messageAvatar: member.avatar,
                        messageContent: message.body,
                        username: member.nickname,
                    }).render(),
                    'text/html'
                ).body.firstChild as ChildNode;

                const parent = document.querySelector('.view-chat__messages');
                parent?.insertBefore(newMessage, parent.firstChild);
                break;
            }
        }
    }

    handleClickSendButton(input: HTMLInputElement) {
        if (input.value) {
            const newMessage = new DOMParser().parseFromString(
                new Message({
                    messageSide: true,
                    messageAvatar: this.props.user.avatar,
                    messageContent: input.value,
                    username: this.props.user.nickname,
                }).render(),
                'text/html'
            ).body.firstChild as ChildNode;

            const parent = document.querySelector('.view-chat__messages');
            parent?.insertBefore(newMessage, parent.firstChild);
            store.dispatch(createGetChatsAction());
            if (this.props?.openedChat?.last_message) {
                this.props.openedChar.last_message = {
                    body: input.value,
                    author_id:
                        this.props.openedChat[this.props.openedChat.length - 1]
                            .author_id,
                };
            }
        }

        getWs().send({
            body: input.value,
            author_id: this.props.user.id,
            chat_id: this.chatId ? parseInt(this.chatId) : 0,
        });

        input.value = '';
    }

    handleClickDeleteButton() {
        store.dispatch(createDeleteChatAction(this.props.openedChat.id));
    }

    handleClickEditButton() {
        store.dispatch(createMoveToEditChatAction(this.props.openedChat));
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.isSubscribed = true;

            if (this.chatId) {
                this.unsubscribe.push(
                    getWs().subscribe(
                        parseInt(this.chatId),
                        this.renderIncomingMessage.bind(this)
                    )
                );

                this.unsubscribe.push(
                    store.subscribe(this.constructor.name, (pr: AnyObject) => {
                        this.props = pr;

                        this.render();
                    })
                );

                store.dispatch(createGetOneChatAction({ chatId: this.chatId }));
            } else {
                const emptyUI = new DumbEmptyDynamicPage({
                    ...this.props,
                });

                this.rootNode.innerHTML = emptyUI.render();
            }
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }
}

import { Component } from '@framework/component';
import { store } from '@store/store';
import { DumbChat } from '@components/chat/chat';
import { DumpMessage } from '@components/message/message';
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

interface Props {
    chatId?: number;
    user?: User;
    openedChat?: OpenedChat;
}

interface State {
    isSubscribed: boolean;
    domElements: {
        submitBtn: HTMLElement | null;
        deleteBtn: HTMLElement | null;
        editBtn: HTMLElement | null;
    };
}

/**
 * Отрисовывает чаты.
 * Прокидывает actions стору для создания диалога, удаление диалога, открыть диалог для просмотра
 * Также подписывается на изменения активного диалога и статуса диалога
 */
export class SmartChat extends Component<Props, State> {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */

    private chatId: number | undefined;
    private unsubscribeFromWs: () => void = () => {};

    constructor(props: Props) {
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
        this.node = DYNAMIC;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state?.isSubscribed && this.chatId) {
            if (this.props?.openedChat?.isNotRendered) {
                const chat = new DumbChat({
                    chatData: this.props.openedChat,
                    userId: this.props?.user?.id ?? 0,
                    userAvatar: this.props?.user?.avatar ?? '',
                    chatAvatar: this.props?.openedChat?.avatar,
                    chatTitle: this.props?.openedChat?.title,
                });

                if (this.node) {
                    this.node.innerHTML = chat.render();
                }

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

                this.unsubscribe();
            }
        }
    }

    renderIncomingMessage(message: Message) {
        this.props?.openedChat?.members.forEach((member) => {
            if (member.id === message.author_id) {
                const newMessage = new DOMParser().parseFromString(
                    new DumpMessage({
                        messageSide: false,
                        messageAvatar: member.avatar,
                        messageContent: message.body,
                        username: member.nickname,
                    }).render(),
                    'text/html'
                ).body.firstChild as ChildNode;

                const parent = document.querySelector('.view-chat__messages');
                parent?.insertBefore(newMessage, parent.firstChild);
            }
        });
    }

    handleClickSendButton(input: HTMLInputElement) {
        if (input.value) {
            const newMessage = new DOMParser().parseFromString(
                new DumpMessage({
                    messageSide: true,
                    messageAvatar: this.props?.user?.avatar ?? '',
                    messageContent: input.value,
                    username: this.props?.user?.nickname ?? '',
                }).render(),
                'text/html'
            ).body.firstChild as ChildNode;

            const parent = document.querySelector('.view-chat__messages');
            parent?.insertBefore(newMessage, parent.firstChild);
            store.dispatch(createGetChatsAction());
        }

        getWs().send({
            id: 0,
            body: input.value,
            author_id: this.props?.user?.id ?? 0,
            chat_id: this.chatId ? this.chatId : 0,
        });

        input.value = '';
    }

    handleClickDeleteButton() {
        store.dispatch(createDeleteChatAction(this.props?.openedChat?.id));
    }

    handleClickEditButton() {
        store.dispatch(createMoveToEditChatAction(this.props?.openedChat));
    }

    componentDidMount() {
        if (!this.state?.isSubscribed) {
            if (this.chatId) {
                this.unsubscribeFromWs = getWs().subscribe(
                    this.chatId,
                    this.renderIncomingMessage.bind(this)
                );

                this.unsubscribe = store.subscribe(
                    this.constructor.name,
                    (pr: Props) => {
                        this.props = pr;

                        this.render();
                    }
                );

                if (this.state?.isSubscribed === false) {
                    this.state.isSubscribed = true;
                }

                store.dispatch(createGetOneChatAction({ chatId: this.chatId }));
            } else {
                const emptyUI = new DumbEmptyDynamicPage({
                    ...this.props,
                });

                if (this.node) {
                    this.node.innerHTML = emptyUI.render();
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.state?.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }
}

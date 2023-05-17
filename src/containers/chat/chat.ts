import { Component } from '@framework/component';
import { store } from '@store/store';
import { DumbChat } from '@components/chat/chat';
import { DumpMessage } from '@components/message/message';
import {
    createAddUserInChat,
    createDeleteChatAction,
    createDeleteUserInChat,
    createEditChatAction,
    createGetOneChatAction,
    createIsNotRenderedAction,
    createOpenChatAction,
} from '@actions/chatActions';
import { getWs } from '@utils/ws';
import { DumbEmptyDynamicPage } from '@components/emptyDynamicPage/emptyDynamicPage';
import {
    createMoveToEditChatAction,
    createMoveToHomePageAction,
} from '@actions/routeActions';
import { ChatTypes, MessageTypes } from '@config/enum';
import { DYNAMIC } from '@config/config';
import { notify } from '@/services/notification';

interface Props {
    chatId?: number;
    user?: User;
    openedChat?: OpenedChat;
}

interface State {
    isSubscribed: boolean;
    editingMessageId: string | undefined;
    domElements: {
        input: HTMLInputElement | null;
        submitBtn: HTMLElement | null;
        deleteBtn: HTMLElement | null;
        editBtn: HTMLElement | null;
        message: HTMLElement | null;
        subscribeBtn: HTMLElement | null;
        leaveGroupBtn: HTMLElement | null;
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
            editingMessageId: undefined,
            domElements: {
                input: null,
                submitBtn: null,
                deleteBtn: null,
                editBtn: null,
                message: null,
                subscribeBtn: null,
                leaveGroupBtn: null,
            },
        };

        this.chatId = props.chatId;
        this.node = DYNAMIC;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed && this.chatId) {
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

                this.state.domElements.input = document.querySelector(
                    '.input-message__text-field__in'
                ) as HTMLInputElement;
                this.state.domElements.submitBtn = document.querySelector(
                    '.view-chat__send-message-button'
                );
                this.state.domElements.deleteBtn =
                    document.querySelector('.delete-btn');
                this.state.domElements.editBtn =
                    document.querySelector('.edit-btn');
                this.state.domElements.subscribeBtn =
                    document.querySelector('.subscribe-btn');
                this.state.domElements.leaveGroupBtn = document.querySelector(
                    '.view-chat__header__icons__leave-group'
                );

                this.state.domElements.leaveGroupBtn?.addEventListener(
                    'click',
                    () => {
                        const updateMembers = this.props?.openedChat?.members
                            .map((member: { id: number }) => {
                                return member.id;
                            })
                            .filter((id: number) => {
                                return id !== this.props?.user?.id;
                            });

                        if (this.props.openedChat) {
                            const updateChannelState = {
                                id: this.props.openedChat.id,
                                type: ChatTypes.Channel,
                                title: this.props.openedChat.title,
                                members: updateMembers ?? [],
                            };

                            async function updateChannelAndMoveToHomePage() {
                                store.dispatch(createDeleteUserInChat());
                                await store.dispatch(
                                    createEditChatAction(updateChannelState)
                                );
                                store.dispatch(createOpenChatAction(undefined));
                                store.dispatch(createMoveToHomePageAction());
                            }

                            updateChannelAndMoveToHomePage();
                        }
                    }
                );

                this.state.domElements?.subscribeBtn?.addEventListener(
                    'click',
                    () => {
                        if (
                            this.state.domElements.subscribeBtn?.textContent ===
                            'Subscribe'
                        ) {
                            this.state.domElements.subscribeBtn.textContent =
                                'Unsubscribe';
                            if (this.props.user) {
                                store.dispatch(
                                    createAddUserInChat(this.props.user)
                                );
                            }
                        } else if (
                            this.state.domElements.subscribeBtn?.textContent ===
                            'Unsubscribe'
                        ) {
                            this.state.domElements.subscribeBtn.textContent =
                                'Subscribe';
                            store.dispatch(createDeleteUserInChat());
                        }

                        if (this.props.openedChat) {
                            const updateMembers =
                                this.props.openedChat.members.map(
                                    (member: { id: number }) => {
                                        return member.id;
                                    }
                                );

                            const updateChannelState = {
                                id: this.props.openedChat.id,
                                type: ChatTypes.Channel,
                                title: this.props.openedChat.title,
                                members: updateMembers,
                            };

                            store.dispatch(
                                createEditChatAction(updateChannelState)
                            );
                        }

                        // const updateChannelState = {
                        //     id: this.props?.openedChat?.id,
                        //     type: ChatTypes.Channel,
                        //     title: this.props?.openedChat?.title,
                        //     avatar: this.props?.openedChat?.avatar,
                        //     members: updateMembers,
                        //     last_message: this.props?.openedChat?.messages[-1]
                        // }

                        // store.dispatch(createGetChatsAction());
                    }
                );

                const messages = document.querySelector('.view-chat__messages');

                messages?.addEventListener('click', (e) => {
                    const message = e?.target as HTMLElement | null | undefined;

                    const messageEdit = message?.closest(
                        '.edit-message'
                    ) as HTMLElement;
                    if (messageEdit) {
                        this.handleEditMessage(messageEdit);
                        e.preventDefault();
                    }

                    const messageDelete = message?.closest(
                        '.delete-message'
                    ) as HTMLElement;
                    if (messageDelete) {
                        this.handleDeleteMessage(messageDelete);
                        e.preventDefault();
                    }
                });

                this.state.domElements?.input?.addEventListener(
                    'keydown',
                    (e) => {
                        if (e.key === 'Enter' && e.target) {
                            this.handleClickSendButton();
                        }
                    }
                );

                this.state.domElements.submitBtn?.addEventListener(
                    'click',
                    (e) => {
                        e.preventDefault();

                        this.handleClickSendButton();
                    }
                );

                this.state.domElements.deleteBtn?.addEventListener(
                    'click',
                    (e) => {
                        e.preventDefault();

                        this.handleClickDeleteButton();
                    }
                );

                if (
                    this.props.openedChat.type === ChatTypes.Group ||
                    (this.props.openedChat.type === ChatTypes.Channel &&
                        this.props?.user?.id ===
                            this.props?.openedChat?.master_id)
                ) {
                    this.state.domElements.editBtn?.addEventListener(
                        'click',
                        () => {
                            this.handleClickEditButton();
                        }
                    );
                }

                store.dispatch(createIsNotRenderedAction());

                this.unsubscribe();

                this.state.domElements?.input?.focus();
            }
        }
    }

    renderIncomingMessage(message: Message) {
        if (message.type === MessageTypes.Edit) {
            document
                .querySelectorAll('.message__right-side__text-content-text')
                .forEach((mes) => {
                    if (mes.getAttribute('name') === message.id) {
                        if (mes.textContent) {
                            mes.textContent = message.body;
                        }
                    }
                });

            return;
        }

        if (message.type === MessageTypes.Delete) {
            document.querySelectorAll('.messages__message').forEach((mes) => {
                if (mes.getAttribute('name') === message.id) {
                    mes.remove();
                }
            });

            return;
        }

        let newMessage;

        if (message.author_id === this.props.user?.id) {
            const newMes = new DumpMessage({
                messageSide: true,
                messageAvatar: this.props.user.avatar,
                messageContent: message.body,
                username: this.props.user.nickname,
                id: message.id,
            }).render();

            if (newMes) {
                newMessage = new DOMParser().parseFromString(
                    newMes,
                    'text/html'
                ).body.firstChild as ChildNode;
            }
        } else {
            this.props.openedChat?.members.forEach((member) => {
                if (member.id === message.author_id) {
                    const newMes = new DumpMessage({
                        messageSide: false,
                        messageAvatar: member.avatar,
                        messageContent: message.body,
                        username: member.nickname,
                        id: message.id,
                    }).render();

                    if (newMes) {
                        newMessage = new DOMParser().parseFromString(
                            newMes,
                            'text/html'
                        ).body.firstChild as ChildNode;

                        notify(
                            member.nickname,
                            message.body,
                            this.props.openedChat?.avatar ?? ''
                        );
                    }
                }
            });
        }

        if (newMessage) {
            const parent = document.querySelector('.view-chat__messages');
            parent?.insertBefore(newMessage, parent.firstChild);
        }
    }

    handleClickSendButton() {
        const body = this.state.domElements.input?.value.trim();
        if (!body) {
            return;
        }

        if (
            this.state.domElements.input?.value &&
            this.chatId &&
            this.props.user?.id
        ) {
            if (this.state.editingMessageId) {
                getWs().send({
                    id: this.state.editingMessageId,
                    type: MessageTypes.Edit,
                    body: this.state.domElements.input?.value,
                    author_id: 0,
                    chat_id: this.chatId,
                });

                this.state.editingMessageId = undefined;
            } else {
                getWs().send({
                    id: '',
                    type: MessageTypes.Create,
                    body: this.state.domElements.input?.value,
                    author_id: this.props.user.id,
                    chat_id: this.chatId,
                });
            }
        }

        if (this.state.domElements.input) {
            this.state.domElements.input.value = '';
        }
    }

    handleDeleteMessage(e: HTMLElement) {
        const id = e.getAttribute('name');
        if (!id || !this.chatId) {
            return;
        }

        getWs().send({
            id,
            type: MessageTypes.Delete,
            body: '',
            author_id: 0,
            chat_id: this.chatId,
        });
    }

    handleEditMessage(e: HTMLElement) {
        const id = e.getAttribute('name');
        if (!id) {
            return;
        }

        this.state.editingMessageId = id;

        if (!this.state.domElements.input) {
            return;
        }

        document
            .querySelectorAll('.message__right-side__text-content-text')
            .forEach((message) => {
                if (
                    message.getAttribute('name') == this.state.editingMessageId
                ) {
                    if (message.textContent && this.state.domElements.input) {
                        this.state.domElements.input.value =
                            message.textContent;
                    }
                }
            });

        this.state.domElements.input.focus();
    }

    handleClickDeleteButton() {
        store.dispatch(createDeleteChatAction(this.props?.openedChat?.id));
    }

    handleClickEditButton() {
        if (this.props.openedChat) {
            store.dispatch(createMoveToEditChatAction(this.props.openedChat));
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            if (this.chatId) {
                this.unsubscribeFromWs = getWs().subscribe(
                    this.chatId,
                    this.renderIncomingMessage.bind(this)
                );

                this.unsubscribe = store.subscribe(
                    this.constructor.name,
                    (props: Props) => {
                        this.props = props;

                        this.render();
                    }
                );

                if (this.state.isSubscribed === false) {
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
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }
}

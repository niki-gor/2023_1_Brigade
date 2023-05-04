import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { Message } from "@/components/message/message";
import { createDeleteChatAction, createEditChatAction, createGetChatsAction, createGetOneChatAction, createIsNotRenderedAction } from "@/actions/chatActions";
import { getWs } from "@/utils/ws";
import { DumbEmptyDynamicPage } from "@/components/emptyDynamicPage/emptyDynamicPage";
import { createMoveToEditChatAction } from "@/actions/routeActions";
import { ChatTypes, MessageTypes } from "@/config/enum";
import { DYNAMIC } from "@/config/config";


export interface SmartChat {
    state: {
        isSubscribed: boolean,
        editingMessageId: string | undefined,
        domElements: {
            input: HTMLInputElement | null;
            submitBtn: HTMLElement | null;
            deleteBtn: HTMLElement | null;
            editBtn: HTMLElement | null;
            message: HTMLElement | null;
            subscribeBtn: HTMLElement | null;
        }
    }
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
    constructor(props: componentProps) {
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
            },
        }
        this.chatId = props.chatId;
        this.rootNode = DYNAMIC;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed && this.chatId) {
            if (this.props?.openedChat?.isNotRendered) {
                console.log('user id: ', this.props?.user?.id);
                console.log('master id: ', this.props.openedChat.master_id);

                const chat = new DumbChat({
                    chatData: this.props.openedChat,
                    userId: this.props?.user?.id,
                    userAvatar: this.props?.user?.avatar,
                    nickname: this.props?.user?.nickname,
                    chatAvatar: this.props?.openedChat?.avatar,
                    chatTitle: this.props?.openedChat?.title,
                });
                
                this.rootNode.innerHTML = chat.render();

                this.state.domElements.input = document.querySelector('.input-message__text-field__in') as HTMLInputElement;
                this.state.domElements.submitBtn = document.querySelector('.view-chat__send-message-button');
                this.state.domElements.deleteBtn = document.querySelector('.delete-btn');
                this.state.domElements.editBtn = document.querySelector('.edit-btn');
                this.state.domElements.subscribeBtn = document.querySelector('.subscribe-btn');

                
                this.state.domElements?.subscribeBtn?.addEventListener('click', () => {
                    
                    if (this.state.domElements.subscribeBtn?.textContent === 'Subscribe') {
                        this.state.domElements.subscribeBtn.textContent = 'Unsubscribe';
                        console.log('opened chat: ', this.props.openedChat);
                        this.props.openedChat.members.push(this.props.user);
                        console.log('after push opened chat: ', this.props.openedChat);
                    } else if (this.state.domElements.subscribeBtn?.textContent === 'Unsubscribe') {
                        this.state.domElements.subscribeBtn.textContent = 'Subscribe';
                        for (let i = 0; i < this.props.openedChat.members.length; ++i) {
                            if (this.props.openedChat.members[i].id === this.props?.user?.id) {
                                this.props.openedChat.members.splice(i, 1);
                            }
                        }
                    }
                    
                    const updateMembers = this.props?.openedChat?.members.map((member: {id: number}) => {
                        return member?.id;
                    })

                    const updateChannelState = {
                        id: this.props?.openedChat?.id,
                        type: ChatTypes.Channel,
                        title: this.props?.openedChat?.title,
                        members: updateMembers,
                    }

                    store.dispatch(createEditChatAction(updateChannelState));
                    store.dispatch(createGetChatsAction());
                })


                const messages = document.querySelector('.view-chat__messages');

                messages?.addEventListener('click', (e) => {
                    const message = e?.target as HTMLElement | null | undefined;

                    const messageEdit = message?.closest('.edit-message') as HTMLElement;
                    if (messageEdit) {
                        this.handleEditMessage(messageEdit)
                        e.preventDefault();
                    }

                    const messageDelete = message?.closest('.delete-message') as HTMLElement;
                    if (messageDelete) {
                        this.handleDeleteMessage(messageDelete)
                        e.preventDefault();
                    }
                }); 

                this.state.domElements?.input?.addEventListener('keydown', e => {
                    if (e.key === 'Enter' && e.target) {
                        this.handleClickSendButton();
                    }
                });

                this.state.domElements.submitBtn?.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.handleClickSendButton();
                });

                this.state.domElements.deleteBtn?.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.handleClickDeleteButton();
                });

                if (this.props.openedChat.type === ChatTypes.Group || this.props.openedChat.type === ChatTypes.Channel 
                    && (this.props?.user?.id === this.props?.openedChat?.master_id)) {
                    this.state.domElements.editBtn?.addEventListener('click', () => {
                        this.handleClickEditButton();
                    });
                }

                store.dispatch(createIsNotRenderedAction());

                const uns = this.unsubscribe.pop();
                if (uns) {
                    uns();
                }

                this.state.domElements?.input?.focus();
            };
        }
    }

    renderIncomingMessage(message: anyObject) {
        if (message.type === MessageTypes.Edit) {
            document.querySelectorAll('.message__right-side__text-content-text').forEach((mes) => {
                if (mes.getAttribute('name') === message.id) {
                    if (mes.textContent) {
                        mes.textContent = message.body;
                    }
                }
            })

            return;
        }

        if (message.type === MessageTypes.Delete) {
            document.querySelectorAll('.messages__message').forEach((mes) => {
                if (mes.getAttribute('name') === message.id) {
                    mes.remove();
                }
            })

            return;
        }

        let newMessage;

        if (message.author_id === this.props.user.id) {
            newMessage = new DOMParser().parseFromString(new Message({
                messageSide: true,
                messageAvatar: this.props.user.avatar,
                messageContent: message.body,
                username: this.props.user.nickname,
                id: message.id,
            }).render(), 'text/html').body.firstChild as ChildNode;
        } else {
            for (const member of this.props?.openedChat.members) {
                if (member.id === message.author_id) {
                    newMessage = new DOMParser().parseFromString(new Message({
                        messageSide: false,
                        messageAvatar: member.avatar,
                        messageContent: message.body,
                        username: member.nickname,
                        id: message.id,
                    }).render(), 'text/html').body.firstChild as ChildNode;
                    break;
                }
            }
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

        if (this.state.editingMessageId) {
            getWs().send({
                id: this.state.editingMessageId,
                type: MessageTypes.Edit,
                body: this.state.domElements.input?.value,
                author_id: 0,
                chat_id: parseInt(this.chatId),
            })

            this.state.editingMessageId = undefined;
        } else {
            getWs().send({
                id: '',
                type: MessageTypes.Create,
                body: this.state.domElements.input?.value,
                author_id: this.props.user.id,
                chat_id: parseInt(this.chatId),
            })
        }

        if (this.state.domElements.input) {
            this.state.domElements.input.value = '';
        }
    }

    handleDeleteMessage(e: HTMLElement) {
        const id = e.getAttribute('name');
        if (!id) {
            return;
        }

        getWs().send({
            id,
            type: MessageTypes.Delete,
            body: '',
            author_id: 0,
            chat_id: parseInt(this.chatId),
        })
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

        document.querySelectorAll('.message__right-side__text-content-text').forEach((message) => {
            if (message.getAttribute('name') == this.state.editingMessageId) {
                if (message.textContent && this.state.domElements.input) {
                    this.state.domElements.input.value = message.textContent;
                }
            }
        })

        this.state.domElements.input.focus();
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
                this.unsubscribe.push(getWs().subscribe(parseInt(this.chatId), this.renderIncomingMessage.bind(this)));
                
                this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                    this.props = pr;

                    this.render();
                }))
                
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
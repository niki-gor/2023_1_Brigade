import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { Message } from "@/components/message/message";
import { createDeleteChatAction, createEditChatAction, createGetChatsAction, createGetOneChatAction, createIsNotRenderedAction, createSetChatsAction } from "@/actions/chatActions";
import { getWs } from "@/utils/ws";
import { DumbEmptyDynamicPage } from "@/components/emptyDynamicPage/emptyDynamicPage";
import { createMoveToEditChatAction } from "@/actions/routeActions";
import { ChatTypes, MessageTypes } from "@/config/enum";
import { DYNAMIC } from "@/config/config";


export interface SmartChat {
    state: {
        isSubscribed: boolean,
        isEditingMessage: boolean,
        domElements: {
            input: HTMLInputElement | null;
            submitBtn: HTMLElement | null;
            deleteBtn: HTMLElement | null;
            editBtn: HTMLElement | null;
            message: HTMLElement | null;
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
            isEditingMessage: false,
            domElements: {
                input: null,
                submitBtn: null,
                deleteBtn: null,
                editBtn: null,
                message: null,
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
                const messages = document.querySelector('.view-chat__messages');

                messages?.addEventListener('click', (e) => {
                    let message = e?.target as HTMLElement | null | undefined;
                    message = message?.closest('.chat-card');
                
                    if (message) {
                        this.handleClickThreeDotsOnMessage
                        e.preventDefault();
                    }
                }); 

                this.state.domElements.input.addEventListener('keydown', e => {
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

                if (this.props.openedChat.type === ChatTypes.Group) {
                    this.state.domElements.editBtn?.addEventListener('click', (e) => {
                        this.handleClickEditButton();
                    });
                }

                store.dispatch(createIsNotRenderedAction());

                const uns = this.unsubscribe.pop();
                if (uns) {
                    uns();
                }
            };
        }
    }

    renderIncomingMessage(message: anyObject) {
        let newMessage;
        console.log('message', message);

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
        getWs().send({
            id: 0,
            type: MessageTypes.Create,
            body: this.state.domElements.input?.value,
            author_id: this.props.user.id,
            chat_id: parseInt(this.chatId),
        })

        if (this.state.domElements.input) {
            this.state.domElements.input.value = '';
        }
    }

    handleClickThreeDotsOnMessage() {

    }

    handleDeleteMessage(e: HTMLElement, id: number) {
        getWs().send({
            id,
            type: MessageTypes.Delete,
            body: '',
            author_id: '',
            chat_id: parseInt(this.chatId),
        })

        if (!this.state.domElements.input) {
            return;
        } 
    }

    handleEditMessage(e: HTMLElement) {
        if (!this.state.domElements.input) {
            return;
        } 
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

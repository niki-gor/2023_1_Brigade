import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { Message } from "@/components/message/message";
import { createDeleteChatAction, createEditChatAction, createGetOneChatAction, createIsNotRenderedAction } from "@/actions/chatActions";
import { getWs } from "@/utils/ws";
import { DumbEmptyDynamicPage } from "@/components/emptyDynamicPage/emptyDynamicPage";
import { createMoveToEditChatAction } from "@/actions/routeActions";
import { ChatTypes } from "@/config/enum";


export interface SmartChat {
    state: {
        isSubscribed: boolean,
        domElements: {
            submitBtn: HTMLElement | null;
            deleteBtn: HTMLElement | null;
            editBtn: HTMLElement | null;
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
            domElements: {
                submitBtn: null,
                deleteBtn: null,
                editBtn: null,
            },
        }
        this.chatId = props.chatId;
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

                this.state.domElements.submitBtn = document.querySelector('.view-chat__send-message-button');
                this.state.domElements.deleteBtn = document.querySelector('.delete-btn');
                this.state.domElements.editBtn = document.querySelector('.edit-btn');

                const input = document.querySelector('.input-message__text-field__in') as HTMLInputElement;

                input.addEventListener('keydown', e => {
                    if (e.key === 'Enter' && e.target) {
                        this.handleClickSendButton(input);
                    }
                });

                this.state.domElements.submitBtn?.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.handleClickSendButton(input);
                });

                this.state.domElements.deleteBtn?.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.handleClickDeleteButton();
                });

                if (this.props.openedChat.type === ChatTypes.Group) {
                    this.state.domElements.editBtn?.addEventListener('click', (e) => {
                        e.preventDefault();

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
        for (const member of this.props?.openedChat.members) {
            if (member.id === message.author_id) {
                const newMessage = new DOMParser().parseFromString(new Message({
                    messageSide: false,
                    messageAvatar: member.avatar,
                    messageContent: message.body,
                    username: member.nickname,
                }).render(), 'text/html').body.firstChild as ChildNode;
                
                const parent = document.querySelector('.view-chat__messages');
                parent?.insertBefore(newMessage, parent.firstChild);
                break;
            }
        }
    }    
    
    handleClickSendButton(input: HTMLInputElement) {
        if (input.value) {
            const newMessage = new DOMParser().parseFromString(new Message({
                messageSide: true,
                messageAvatar: this.props.openedChat.avatar,
                messageContent: input.value,
                username: this.props.user.nickname,
            }).render(), 'text/html').body.firstChild as ChildNode;
            
            const parent = document.querySelector('.view-chat__messages');
            parent?.insertBefore(newMessage, parent.firstChild);
        }
        
        getWs().send({
            body: input.value,
            author_id: this.props.user.id,
            chat_id: parseInt(this.chatId),
        })

        input.value = '';
    }

    handleClickDeleteButton() {
        store.dispatch(createDeleteChatAction(this.props.openedChat.id));
    }

    handleClickEditButton() {
        console.log('openedChat: ', this.props.openedChat);
        store.dispatch(createMoveToEditChatAction(this.props.openedChat));
    }

    async componentDidMount() {
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

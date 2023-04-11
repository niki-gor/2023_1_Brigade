import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { Message } from "@/components/message/message";
import { createDeleteChatAction, createGetOneChatAction, createOpenChatAction } from "@/actions/chatActions";
import { getWs } from "@/utils/ws";
import { DumbEmptyDynamicPage } from "@/components/emptyDynamicPage/emptyDynamicPage";


export interface SmartChat {
    state: {
        isSubscribed: boolean,
        domElements: {
            submitBtn: HTMLElement | null;
            deleteBtn: HTMLElement | null;
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
            },
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed && this.chatId) {
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
            this.state.domElements.submitBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                const sendBtn = e.target as HTMLElement;

                this.handleClickSendButton(sendBtn);
            });

            this.state.domElements.deleteBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                const deleteBtn = e.target as HTMLElement;

                this.handleClickDeleteButton(deleteBtn);
            })
        } else {
            const emptyUI = new DumbEmptyDynamicPage({ 
                ...this.props,
            }); 

            this.rootNode.innerHTML = emptyUI.render();
        }
        
        const uns = this.unsubscribe.pop();
        if (uns) {
            uns();
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
    
    handleClickSendButton(sendBtn: HTMLElement) {
        const input = document.querySelector('.input-message__text-field__in') as HTMLInputElement;
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

    handleClickDeleteButton(deleteBtn: HTMLElement) {
        this.componentWillUnmount();
        const chatId = this.props.openedChat.id;
        store.dispatch(createDeleteChatAction(chatId));
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
                this.render();
            }
        }
    }

    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubscribed = false;
    }
}

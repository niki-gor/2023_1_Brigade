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
        if (this.state.isSubscribed && this.props.chatId) {
            console.log('Chat props', this.props);
            const chat = new DumbChat({
                chatData: this.props.openedChat,
                userId: this.props?.user?.id,
                userAvatar: this.props?.user?.avatar,
                username: this.props?.user?.username,
                chatAvatar: this.props?.openedChat?.avatar,
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
    }

    renderIncomingMessage(message: anyObject) {
        for (const member of this.props?.openedChat.members) {
            if (member.id === message.author_id) {
                const newMessage = new Message({
                    messageSide: false,
                    messageAvatar: member.avatar,
                    messageContent: message.body,
                    username: member.username,
                }).render();
                const parent = document.querySelector('.view-chat__messages');
                parent?.appendChild(newMessage);
                break;
            }
        }
    }    
    
    handleClickSendButton(sendBtn: HTMLElement) {
        const input = document.querySelector('.input-message__text-field__in') as HTMLInputElement;
        if (input.value) {
            const newMessage = new Message({
                messageSide: true, // true - мы создаем сообщение
                messageAvatar: this.props.openedChat.avatar,
                messageContent: input.value,
                username: this.props.user.username,
            }).render();
            const parent = document.querySelector('.view-chat__messages');
            parent?.appendChild(newMessage);
        }
        
        getWs().send({
            body: input.value,
            author_id: this.props.user.id,
            chat_id: this.props.chatID,
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

            if (this.props.chatId) {
                this.unsubscribe.push(getWs().subscribe(this.props.chatID, this.renderIncomingMessage));

                this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                    this.props = pr;

                    this.render();
                }))

                for (const key in this.props.chats) {
                    if (this.props.chats[key].id == this.props.chatId) {
                        store.dispatch(createGetOneChatAction(this.props.chats[key]));
                        break;
                    }
                }
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

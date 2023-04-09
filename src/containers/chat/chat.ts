import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { createRenderAction } from "@/actions/routeActions";
import { Message } from "@/components/message/message";
import { router } from "@/router/router";


export interface SmartChat {
    state: {
        isSubsribed: boolean,
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
            isSubsribed: false,
            domElements: {
                submitBtn: null,
                deleteBtn: null,
            }
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubsribed && this.props.openedChat) {
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
        input.value = '';
    }

    handleClickDeleteButton(deleteBtn: HTMLElement) {
        const chatId = this.props.chatId;
        // store.dispatch(deleteChatAction(chatId));
    }

    // handleWebSocketMessage(event: Event) : string {
    //     const message = event.data;
    //     return message;
    // }

    componentDidMount() {
        if (!this.state.isSubsribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
            }))

            this.state.isSubsribed = true;
            // this.render();
            // store.dispatch(createRenderAction()); // TODO: отправиь сообщение createSendMessage
        }
    }

    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubsribed = false;
    }
}
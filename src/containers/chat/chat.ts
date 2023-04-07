import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";
import { createRenderAction } from "@/actions/routeActions";
import { Message } from "@/components/message/message";


export interface SmartChat {
    state: {
        isSubsribed: boolean,
        domElements: {
            submitBtn: HTMLElement | null;
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
            }
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubsribed) {
            // TODO: this.state.openChat.avatar и тд
            const chat = new DumbChat({ avatar: './assets/img/geva.png', // this.props.avatar
                                        username: 'Gevork Gabrielyan', // this.props.username
                                        title: this.props.title,
                                        messages: this.props.messages,
                                        members: this.props.members,
                                        userStatus: 'ha ha chill',
                                        userOnline: false,
                                        friendAvatar: './assets/img/iii.png',
                                        messageContent: 'Salam bro. How are you ? anasdkalksdlkandlkfnakldnfalkdsnalknfakdnfalkfnklasndalknfklandlkandlaknsdflkakndflaknflknaklf aldfk akld flakfnal alkdfnakldfnaldf alksf a dlkfnaflksanfalkfnsnalkfn aldfk akld flakfnal alkdfnakldfnaldf alksf a  laknflknaklf aldfk akld flakfnal alkdfnakldfnaldf alksf a dlkfnaflksanfalkfdlkfnaflksanfalkfnsnalkfn',
                                        messageSide: true, // true, если мы отправили сообщение
            }); // TODO: прокидываем объект из swagger-a

            this.rootNode.innerHTML = chat.render();

            this.state.domElements.submitBtn = document.querySelector('.view-chat__send-message-button');
            this.state.domElements.submitBtn?.addEventListener('click', (e) => {
                e.preventDefault();
                const sendBtn = e.target as HTMLElement;

                this.handleClickSendButton(sendBtn);
            })

        }
    }

    handleClickSendButton(sendBtn: HTMLElement) {
        // TODO: из input-a забираем текст
        //  Создаем сообщение,
        const input = document.querySelector('.input-message__text-field__in') as HTMLInputElement;
        if (input.value) {
            const message = new Message({
                messageContent: input.value,
                messageAvatar: './assets/img/geva.png', // TODO: this.state.avatar
                messageSide: true, // true - левая сторона
                username: 'Gevork Gabrielyan', // TODO: this.state.username
            })

            // TODO: this.state.messages.push(message); - websocket ???
            // TODO: store.dispatch(createMessageDialogAction(this.props.messages.push(input))); - хер знает как там в store будет изменяться
        }
    }

    componentDidMount() {
        if (!this.state.isSubsribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
                
                this.render();
            }))

            this.state.isSubsribed = true;
            store.dispatch(createRenderAction());
        }
    }

    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubsribed = false;
    }
}
import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbChat } from "@/components/chat/chat";


export interface SmartChat {
    state: {
        isSubsribed: boolean,
        domElements: {
            submitBtn: HTMLElement | null;
            searchBtn: HTMLElement | null;
            chatInfoBtn: HTMLElement | null;
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
                searchBtn: null,
                chatInfoBtn: null,
            }
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        const changeTheme = {white: 'change-theme__white', black: 'change-theme__black'};

        if (this.state.isSubsribed) {
            const chat = new DumbChat({pathToUserImage: './assets/img/iii.png', 
                                        userName: 'Daniil Zelenko',
                                        userStatus: 'ha ha chill',
                                        friendAvatar: './assets/img/geva.png',
                                        newMessage: 'salam bro',
            }); // TODO: прокидываем объект из swagger-a

            this.rootNode.innerHTML = chat.render();
        }
    }


    componentDidMount() {
        if (!this.state.isSubsribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
                
                this.render();
            }))

            this.state.isSubsribed = true;
        }

        // store.dispatch(createRenderAction()); // говорим что че то произошло
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubsribed = false;
    }
}
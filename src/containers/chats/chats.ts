import { Container } from "@containers/container";
import { DumbChat } from "@/pages/chat/chat";
import { store } from "@/store/store";


export interface SmartChat {
    state: {
        isSubsribed: boolean,
        domElements: {
            createChatButton: HTMLElement | null;
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
                createChatButton: null,
            }
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubsribed) {
            const ChatUi = new DumbChat({})

            this.rootNode.innerHTML = ChatUi.render();
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
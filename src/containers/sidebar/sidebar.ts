import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbNavbar } from "@/components/navbar/navbar";
import { createRenderAction } from "@/actions/routeActions";


export interface SmartSidebar {
    state: {
        isSubscribed: boolean,
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
export class SmartSidebar extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                // прописать htmlElement-ы, на которые будут навещаны обработчики
                createChatButton: null,
            }
        }
    }

    /**
     * Рендерит чат
     */
    render() {
        const svgButtons: Map<string, Object> = new Map();
        svgButtons.set('messgeButton', {className: 'nav-item__message-btn', value: 48});
        svgButtons.set('contactButton', {className: 'nav-item__contact-btn'});
        svgButtons.set('logoutButton', {className: 'logout-btn'});

        const changeTheme = {white: 'change-theme__white', black: 'change-theme__black'};

        if (this.state.isSubscribed) {
            const navbar = new DumbNavbar({svgButtons: svgButtons, changeTheme: changeTheme}); // TODO: перенести сюда логику создания UI элементов

            this.rootNode.innerHTML = navbar.render();
        }
    }


    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
                
                this.render();
            }))

            this.state.isSubscribed = true;

            store.dispatch(createRenderAction());
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }
}
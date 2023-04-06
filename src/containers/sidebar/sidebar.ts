import { Container } from "@containers/container";
import { store } from "@/store/store";
import { DumbNavbar } from "@/components/navbar/navbar";
import { DumbNavItem } from "@/components/navItem/navItem";


export interface SmartSidebar {
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
export class SmartSidebar extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: componentProps) {
        super(props);
        this.state = {
            isSubsribed: false,
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

        if (this.state.isSubsribed) {
            const navbar = new DumbNavbar({svgButtons: svgButtons, changeTheme: changeTheme}); // TODO: перенести сюда логику создания UI элементов

            this.rootNode.innerHTML = navbar.render();
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
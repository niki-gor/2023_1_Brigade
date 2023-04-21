import { Container } from "@containers/container";
import { store } from "@store/store";
import { DumbSidebar } from "@components/sidebar/sidebar";
import { createMoveToChatsAction, createMoveToContactsAction, createMoveToProfileAction, createRenderAction } from "@actions/routeActions";
import { createLogoutAction } from "@actions/authActions";
import { SIDEBAR } from "@config/config";


export interface SmartSidebar {
    state: {
        isSubscribed: boolean,
        domElements: {
            messageButton: HTMLElement | null,
            contactButton: HTMLElement | null,
            logoutButton: HTMLElement | null,
            avatarButton: HTMLElement | null,
            //TODO: themeButton
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
                messageButton: null,
                contactButton: null,
                logoutButton: null,
                avatarButton: null,
            }
        }

        this.rootNode = SIDEBAR;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed) {
            const navbar = new DumbSidebar({ 
                ...this.props.user,
            });

            this.rootNode.innerHTML = navbar.render();

            this.state.domElements.avatarButton = document.querySelector('.header__user-photo');
            this.state.domElements.avatarButton?.addEventListener('click', (e) => {
                e.preventDefault();

                store.dispatch(createMoveToProfileAction());
            });

            this.state.domElements.contactButton = document.querySelector('.nav-item__contact-btn');
            this.state.domElements.contactButton?.addEventListener('click', (e) => {
                e.preventDefault();

                store.dispatch(createMoveToContactsAction());
            });
            
            this.state.domElements.messageButton = document.querySelector('.nav-item__message-btn');
            this.state.domElements.messageButton?.addEventListener('click', (e) => {
                e.preventDefault();

                store.dispatch(createMoveToChatsAction());
            });

            this.state.domElements.logoutButton = document.querySelector('.logout-btn');
            this.state.domElements.logoutButton?.addEventListener('click', (e) => {
                e.preventDefault();

                store.dispatch(createLogoutAction());
            });
        }
    }


    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
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
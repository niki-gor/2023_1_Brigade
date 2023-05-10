import { Component } from '@framework/component';
import { store } from '@store/store';
import { DumbSidebar } from '@components/sidebar/sidebar';
import {
    createMoveToChatsAction,
    createMoveToContactsAction,
    createMoveToProfileAction,
    createRenderAction,
} from '@actions/routeActions';
import { createLogoutAction } from '@actions/authActions';
import { SIDEBAR } from '@config/config';

interface Props {
    user?: {
        avatar: string;
    };
}

interface State {
    isSubscribed: boolean;
    domElements: {
        messageButton: HTMLElement | null;
        contactButton: HTMLElement | null;
        logoutButton: HTMLElement | null;
        avatarButton: HTMLElement | null;
    };
}

/**
 * Отрисовывает чаты.
 * Прокидывает actions стору для создания диалога, удаление диалога, открыть диалог для просмотра
 * Также подписывается на изменения активного диалога и статуса диалога
 */
export class SmartSidebar extends Component<Props, State> {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                messageButton: null,
                contactButton: null,
                logoutButton: null,
                avatarButton: null,
            },
        };

        this.node = SIDEBAR;
    }

    /**
     * Рендерит чат
     */
    render() {
        if (this.state.isSubscribed) {
            const navbar = new DumbSidebar({
                avatar: this.props?.user?.avatar ?? '',
            });

            if (this.node) {
                this.node.innerHTML = navbar.render();
            }

            this.state.domElements.avatarButton = document.querySelector(
                '.header__user-photo'
            );
            this.state.domElements.avatarButton?.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();

                    store.dispatch(createMoveToProfileAction());
                }
            );

            this.state.domElements.contactButton = document.querySelector(
                '.nav-item__contact-btn'
            );
            this.state.domElements.contactButton?.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();

                    store.dispatch(createMoveToContactsAction());
                }
            );

            this.state.domElements.messageButton = document.querySelector(
                '.nav-item__message-btn'
            );
            this.state.domElements.messageButton?.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();

                    store.dispatch(createMoveToChatsAction());
                }
            );

            this.state.domElements.logoutButton =
                document.querySelector('.logout-btn');
            this.state.domElements.logoutButton?.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();

                    store.dispatch(createLogoutAction());
                }
            );
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe = store.subscribe(
                this.constructor.name,
                (props: Props) => {
                    this.props = props;

                    this.render();
                }
            );

            if (this.state.isSubscribed === false) {
                this.state.isSubscribed = true;
            }

            store.dispatch(createRenderAction());
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }
}

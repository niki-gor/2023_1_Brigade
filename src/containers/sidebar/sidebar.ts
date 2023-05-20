import { Component } from '@framework/component';
import { store } from '@store/store';
import { DumbSidebar } from '@components/new-sidebar/sidebar';
import {
    createMoveToChatsAction,
    createMoveToContactsAction,
    createMoveToProfileAction,
} from '@actions/routeActions';
import { createLogoutAction } from '@actions/authActions';

interface Props {
    parent: HTMLElement;
}

interface State {
    isMounted: boolean;
    node?: DumbSidebar;
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
        this.state.isMounted = false;

        this.node = this.render() as HTMLElement;
        this.componentDidMount();
    }

    destroy() {
        if (this.state.isMounted) {
            this.componentWillUnmount();
        } else {
            console.error('SmartSidebar is not mounted');
        }
    }

    render() {
        return this.props.parent;
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        this.state.node = new DumbSidebar({
            parent: this.node,
            avatar: this.hookAvatar(store.getState()) ?? '',
            avatarOnClick: this.avatarOnClick,
            chatsOnClick: this.chatsOnClick,
            contactsOnClick: this.contactsOnClick,
            logoutOnClick: this.logoutOnClick,
            hookAvatar: this.hookAvatar,
        });
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        this.state.isMounted = false;
    }

    hookAvatar(state: StoreState) {
        return state.user?.avatar ?? '';
    }

    avatarOnClick() {
        store.dispatch(createMoveToProfileAction());
    }

    chatsOnClick() {
        store.dispatch(createMoveToChatsAction());
    }

    contactsOnClick() {
        store.dispatch(createMoveToContactsAction());
    }

    logoutOnClick() {
        store.dispatch(createLogoutAction());
        const popUpOpen = () => {
            document.querySelector('.sidebar-header__logout-btn')?.addEventListener('click', () => {
                // TODO: popup component
            })
        }
    }
}

import { Component } from '@/framework/component';
import template from '@components/new-sidebar/sidebar.pug';
import '@components/new-sidebar/sidebar.scss';
import { Button } from '@uikit/button/button';
import { svgButtonUI } from '../ui/icon/button';
import { Avatar } from '@uikit/avatar/avatar';
import { store } from '@store/store';


interface Props {
    parent: HTMLElement | undefined | null;
    profile: string;
    style?: Record<string, string | number>;
    onClick?: (e?: Event) => void;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement | undefined;
    profile: Avatar;
    chatsBtn: Button;
    contactsBtn: Button;
    logoutBtn: Button;
}

export class DumbSidebar extends Component<Props, State, HTMLElement> {
    constructor(props: Props) {
        super(props);

        debugger;
        console.log('dumb sidebar constructor has been called');

        if (this.props.parent) {
            this.node = this.render() as HTMLElement;
            this.state.isSubscribed = true;
            this.state.parent = this.props.parent;
            this.componentDidMount();
            this.props.parent.appendChild(this.node);
        }

        this.state.profile = new Avatar({
            parent: document.querySelector('.sidebar-header') as HTMLElement,
            className: 'sidebar-header__profile',
            src: this.props?.profile ?? '',
            alt: this.props?.profile ?? '',
        })

        this.state.chatsBtn = new Button({
            parent: document.querySelector('.sidebar-header') as HTMLElement,
            className: 'sidebar-header__chats-btn',
            icon: svgButtonUI.renderTemplate({
                svgClassName: 'sidebar__chats-icon' ?? '',
            })
        })

        this.state.contactsBtn = new Button({
            parent: document.querySelector('.sidebar-header') as HTMLElement,
            className: 'sidebar-header__contacts-btn',
            icon: svgButtonUI.renderTemplate({
                svgClassName: 'sidebar__contacts-icon' ?? '',
            })
        })

        this.state.logoutBtn = new Button({
            parent: document.querySelector('.sidebar-header') as HTMLElement,
            className: 'sidebar-header__logout-btn',
            icon: svgButtonUI.renderTemplate({
                svgClassName: 'logout-btn' ?? '',
            })
        })
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

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

        if (this.props.onClick) {
            this.node.addEventListener('click', this.props.onClick);
        }
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        if (this.props.onClick) {
            this.node.removeEventListener('click', this.props.onClick);
        }
    }

    private render() {
        return new DOMParser().parseFromString(
            template({}),
        'text/html',
        ).body.firstChild;
    }
}

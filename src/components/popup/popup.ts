import { Component } from '@/framework/component';
import { store } from '@/store/store';
import template from '@components/popup/popup.pug';
import '@components/popup/popup.scss';
import { Button } from '@uikit/button/button';

interface Props {
    parent: HTMLElement;
    style?: Record<string, string | number>;
    confirmLogoutOnClick: (e?: Event) => void;
    cancelLogoutOnClick: (e?: Event) => void;
}

interface State {
    isMounted: boolean;
    confirmBtn: Button;
    cancelBtn: Button;
}

export class Popup extends Component<Props, State, HTMLElement> {
    constructor(props: Props) {
        super(props);
        this.state.isMounted = false;

        this.node = this.render() as HTMLElement;
        this.props.parent.appendChild(this.node);
        this.componentDidMount();
        this.update.bind(this);
    }

    destroy() {
        if (this.state.isMounted) {
            this.componentWillUnmount();
            this.node?.remove();
            this.node = undefined;
        } else {
            console.error('Popup is not mounted');
        }
    }

    update() {
        if (this.state.isMounted) {
            const prevNode = this.node;

            this.componentWillUnmount();
            this.node = this.render() as HTMLElement;
            this.componentDidMount();

            prevNode?.replaceWith(this.node);
        } else {
            console.error('Popup is not mounted');
        }
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        this.state.confirmBtn = new Button({
            parent: this.node,
            className: 'sidebar-header__chats-btn sidebar-header__list__item',
            onClick: this.props.confirmLogoutOnClick,
        });

        this.state.cancelBtn = new Button({
            parent: this.node,
            className: 'sidebar-header__contacts-btn sidebar-header__list__item',
            onClick: this.props.cancelLogoutOnClick,
        });

        this.unsubscribe = store.subscribe(this.constructor.name, (state) => {
            const prevProps = this.props;

            if (this.props !== prevProps) {
                this.update();
            }
        });

        this.state.isMounted = true;
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        this.state.confirmBtn.destroy();
        this.state.cancelBtn.destroy();

        this.state.isMounted = false;
    }

    private render() {
        return new DOMParser().parseFromString(template({}), 'text/html').body
            .firstChild;
    }
}

import '@uikit/dropdown/dropdown.scss';
import template from '@uikit/dropdown/dropdown.pug';
import { Component } from '@framework/component';

interface Props {
    label?: string;
    icon?: string;
    className?: string;
    size?: 'S' | 'M' | 'L';
    style?: Record<string, string | number>;
    parent: HTMLElement;
}

interface State {}

export class Dropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.node = this.render() as HTMLButtonElement;
        this.componentDidMount();
        this.props.parent.appendChild(this.node);
    }

    destroy() {
        this.componentWillUnmount();
        this.node?.remove();
        this.node = undefined;
    }

    getNode() {
        return this.node;
    }

    onClick() {
        this.node
            ?.querySelector('.dropdown-menu')
            ?.classList.toggle('.dropdown-menu-show');
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        if (this.onClick) {
            this.node
                .querySelector('.dropdown-toggle')
                ?.addEventListener('click', this.onClick);
        }
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        if (this.onClick) {
            this.node
                .querySelector('.dropdown-toggle')
                ?.removeEventListener('click', this.onClick);
        }
    }

    render() {
        const className = `${this.props.className ?? ''}`.trim();

        return new DOMParser().parseFromString(
            template({
                className,
            }),
            'text/html'
        ).body.firstChild;
    }
}

import '@uikit/input/input.scss';
import template from '@uikit/input/input.pug';
import { Component } from '@framework/component';

interface Props {
    label?: string;
    caption?: string;
    placeholder?: string;
    value?: string;
    contentType?: string;
    className?: string;
    size?: 'S' | 'M' | 'L';
    style?: Record<string, string | number>;
    onChange?: (e?: Event) => void;
    parent: HTMLElement;
}

interface State {}

export class Input extends Component<Props, State, HTMLInputElement> {
    constructor(props: Props) {
        super(props);

        this.node = this.render() as HTMLInputElement;
        this.componentDidMount();
        this.props.parent.appendChild(this.node);
    }

    destroy() {
        this.componentWillUnmount();
        this.node?.remove();
        this.node = undefined;
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        if (this.props.onChange) {
            this.node.addEventListener('input', this.props.onChange);
        }
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        if (this.props.onChange) {
            this.node.removeEventListener('input', this.props.onChange);
        }
    }

    render() {
        const className = `${this.props.className ?? ''} ${
            this.props.size ?? ''
        }`.trim();

        return new DOMParser().parseFromString(
            template({
                className,
                label: this.props.label ?? '',
                caption: this.props.caption ?? '',
                placeholder: this.props.placeholder ?? '',
                value: this.props.value ?? '',
                contentType: this.props.contentType ?? '',
                style: this.props.style ?? '',
            }),
            'text/html'
        ).body.firstChild;
    }
}

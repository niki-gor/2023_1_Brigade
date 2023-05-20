import '@components/message-input/message-input.scss';
import template from '@components/message-input/message-input.pug';
import { Component } from '@framework/component';
import { Img } from '@uikit/img/img';
import { svgButtonUI } from '../ui/icon/button';

interface Props {
    onSend: () => void;
    className?: string;
    style?: Record<string, string | number>;
    parent: HTMLElement;
}

interface State {
    icons: string[];
    sendButton: HTMLElement | null;
    img?: Img;
}

export class MessageInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            icons: [],
            sendButton: null,
        };

        this.node = this.render() as HTMLElement;
        this.componentDidMount();
        this.props.parent.appendChild(this.node);

        this.update.bind(this);
    }

    changeText(text: string) {
        const input = this.node?.querySelector(
            '.message-input__text-field__in'
        ) as HTMLInputElement;
        input.value = text;
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

        this.state.sendButton = this.node.querySelector(
            '.view-chat__send-message-button'
        );

        this.state.sendButton?.addEventListener('click', this.props.onSend);
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        this.state.sendButton?.removeEventListener('click', this.props.onSend);

        this.state.img?.destroy();
    }

    render() {
        const className = `${this.props.className ?? ''}`.trim();

        this.state.icons.push(
            svgButtonUI.renderTemplate({
                svgClassName: 'view-chat__send-message-button',
            })
        );

        return new DOMParser().parseFromString(
            template({
                className,
                icons: this.state.icons,
            }),
            'text/html'
        ).body.firstChild;
    }

    update() {
        const prevNode = this.node;

        this.componentWillUnmount();
        this.node = this.render() as HTMLElement;
        this.componentDidMount();

        prevNode?.replaceWith(this.node);
    }
}

import '@uikit/message/message.scss';
import template from '@uikit/message/message.pug';
import { Component } from '@framework/component';

interface Props {
    message: Message;
    user?: User;
    place: 'left' | 'right';
    className?: string;
    style?: Record<string, string | number>;
    onRightClick: (e?: Event) => void;
    parent: HTMLElement;
}

interface State {}

export class DumpMessage extends Component<Props, State> {
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

    componentDidMount() {
        if (!this.node) {
            return;
        }

        //TODO: создание аватарки, стикера или вложения, если есть

        this.node.addEventListener('contextmenu', this.props.onRightClick);
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        //TODO: удаление аватарки, стикера или вложения, если есть

        this.node.removeEventListener('contextmenu', this.props.onRightClick);
    }

    render() {
        const className = `${this.props.className ?? ''} message__${
            this.props.place
        }`.trim();

        return new DOMParser().parseFromString(
            template({
                className,
                style: this.props.style ?? '',
                nickname: this.props.user?.nickname ?? '',
                avatar: this.props.user?.avatar ?? '',
                body: this.props.message.body,
                image: this.props.message.image_url,
            }),
            'text/html'
        ).body.firstChild;
    }
}

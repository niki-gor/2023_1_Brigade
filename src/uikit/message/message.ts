import '@uikit/message/message.scss';
import template from '@uikit/message/message.pug';
import { Component } from '@framework/component';
import { Img } from '../img/img';
import { MessageTypes } from '@/config/enum';
import { store } from '@/store/store';

interface Props {
    message: Message;
    hookMessage: (state: StoreState) => Message;
    user?: User;
    hookUser?: (state: StoreState) => User;
    place: 'left' | 'right';
    className?: string;
    style?: Record<string, string | number>;
    onRightClick: (e?: Event) => void;
    parent: HTMLElement;
}

interface State {
    avatar?: Img;
    img?: Img;
}

export class DumbMessage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.node = this.render() as HTMLButtonElement;
        this.componentDidMount();
        this.props.parent.appendChild(this.node);

        this.update.bind(this);
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

        if (this.props.user) {
            const messageAvatar = this.node.querySelector(
                '.message__avatar'
            ) as HTMLElement;

            if (messageAvatar) {
                this.state.avatar = new Img({
                    src: this.props.user.avatar,
                    borderRadius: '50',
                    size: 'S',
                    alt: this.props.user.nickname,
                    parent: messageAvatar,
                });
            }
        }

        if (this.props.message.image_url) {
            const messageImage = this.node.querySelector(
                '.message__image'
            ) as HTMLElement;

            if (messageImage) {
                this.state.img = new Img({
                    src: this.props.message.image_url,
                    borderRadius: '10',
                    size:
                        this.props.message.type === MessageTypes.notSticker
                            ? 'L'
                            : 'M',
                    alt: '',
                    parent: messageImage,
                });
            }
        }

        this.node.addEventListener('contextmenu', this.props.onRightClick);

        this.unsubscribe = store.subscribe(this.constructor.name, (state) => {
            const prevProps = this.props;

            this.props.message = this.props.hookMessage(state);
            if (this.props.user && this.props.hookUser) {
                this.props.user = this.props.hookUser(state);
            }

            if (this.props !== prevProps) {
                this.update();
            }
        });
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        this.state.avatar?.destroy();
        this.state.img?.destroy();

        this.node.removeEventListener('contextmenu', this.props.onRightClick);
        this.node = undefined;
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

    update() {
        const prevNode = this.node;

        this.componentWillUnmount();
        this.node = this.render() as HTMLElement;
        this.componentDidMount();

        prevNode?.replaceWith(this.node);
    }
}

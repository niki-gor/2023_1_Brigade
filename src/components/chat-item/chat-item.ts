import { Component } from "@/components/component";
import { store } from "@/store/store";
import template from "@components/chat-item/chat-item.pug";
import "@components/chat-item/chat-item.scss";
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";

export class ChatItem extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            parent: this.props.parent,
            node: undefined,
            isSubscribed: false,
            onClick: this.props.onClick,
            chatId: this.props.chat.id,
            observe: this.props.observe
        }

        this.unsubscribe = () => {};
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.node = this.render();
            if (this.props.isCurrent) {
                this.state.node.classList.add('is_current');
            }
            this.state.node.addEventListener('click', (e: Event) => {
                this.state.onClick(e);
            });

            this.unsubscribe = store.subscribe(this.constructor.name + `:${this.state.chatId}`, (props: anyObject) => {
                let prop = props;
                this.state.observe.forEach((item: string) => {
                    prop = prop[item];
                })
                const index = prop.findIndex((chat: { id: number }) => {
                    return chat?.id === this.state?.chatId;
                })

                if (this.props.chat != prop[index]) {
                    this.props.chat = prop[index];

                    this.update();
                }
            })

            this.state.parent.appendChild(this.state.node);
            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.node.remove();
            this.state.isSubscribed = false;
        }
    }

    update() {
        const updatedNode = this.render();
        if (this.props.isCurrent) {
            this.state.node.classList.add('is_current');
        }
        this.state.node.replaceWith(updatedNode);
        this.state.node = updatedNode;
    }

    render() {
        return new DOMParser().parseFromString(template({
            avatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props.chat?.avatar,
                altMsg: this.props.chat?.title,
            }),
            title: this.props.chat?.title,
            lastMessage: this.props.chat?.last_message?.body ?? '',
            id: this.props.chat?.id - 1,
        }), 'text/html').body.firstChild;
    }
}

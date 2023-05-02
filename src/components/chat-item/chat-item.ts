import { Component } from "@/components/component";
import { store } from "@/store/store";
import template from "@components/chatCard/chatCard.pug";
import "@components/chatCard/chatCard.scss";
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
        }

        this.unsubscribe = () => {};
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.node = this.render();
            this.state.node.addEventListener('click', (e: Event) => {
                this.state.onClick(e);
            });

            this.unsubscribe = store.subscribe(this.constructor.name + `:${this.state.chatId}`, (props: anyObject) => {
                const index = props.chats.findIndex((chat: { id: number }) => {
                    return chat.id === this.state.chatId;
                })

                if (this.props.chat != props.chats[index]) {
                    this.props.chat = props.chats[index];

                    this.update();
                }
            })

            this.state.parent.appendChild(this.state.node);
            this.state.isSubscribed = true;
        }
    }

    componentWillMount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.node.remove();
            this.state.isSubscribed = false;
        }
    }

    update() {
        const updatedNode = this.render();

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
            id: this.props.chat?.id,
        }), 'text/html').body;
    }
}

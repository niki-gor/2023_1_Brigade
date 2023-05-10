import { Component } from '@framework/component';
import { store } from '@/store/store';
import template from '@components/contact-item/contact-item.pug';
import '@components/contact-item/contact-item.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';

interface Props {
    parent?: HTMLElement;
    onClick?: (e: Event) => void;
    contact?: User;
    observe?: string[];
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement;
    node: HTMLElement | undefined;
    onClick?: (e: Event) => void;
    contactId?: number;
    observe?: string[];
}

export class ContactItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isSubscribed: false,
            parent: this.props.parent,
            node: undefined,
            onClick: this.props.onClick,
            contactId: this.props.contact?.id,
            observe: this.props.observe,
        };

        this.unsubscribe = () => {};
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.node = this.render() as HTMLElement;
            this.state.node.addEventListener('click', (e: Event) => {
                this.state.onClick?.(e);
            });

            this.unsubscribe = store.subscribe(
                this.constructor.name + `:${this.state.contactId}`,
                (props: Props) => {
                    let prop = props;
                    this.state.observe?.forEach((item: string) => {
                        prop = prop[item];
                    });
                    const index = prop.findIndex((contact: { id: number }) => {
                        return contact.id === this.state.contactId;
                    });

                    if (this.props.contact != prop[index]) {
                        this.props.contact = prop[index];

                        this.update();
                    }
                }
            );

            this.state.parent?.appendChild(this.state.node);
            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe();
            this.state.node?.remove();
            this.state.isSubscribed = false;
        }
    }

    update() {
        const updatedNode = this.render() as HTMLElement;
        this.state.node?.replaceWith(updatedNode);
        this.state.node = updatedNode;
    }

    render() {
        return new DOMParser().parseFromString(
            template({
                avatar: smallEllipseIconUI.renderTemplate({
                    imgSrc: this.props.contact?.avatar ?? '',
                    altMsg: this.props.contact?.nickname ?? '',
                }),
                nickname: this.props.contact?.nickname,
                status: this.props.contact?.status,
                id: this.props.contact?.id,
            }),
            'text/html'
        ).body.firstChild;
    }
}

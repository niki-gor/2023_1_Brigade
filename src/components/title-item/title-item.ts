import { Component } from '@framework/component';
import template from '@components/title-item/title-item.pug';
import '@components/title-item/title-item.scss';

interface Props {
    parent?: HTMLElement;
    title?: string;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement;
    node: HTMLElement | undefined;
}

export class TitleItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parent: this.props.parent,
            node: undefined,
            isSubscribed: false,
        };
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.node = this.render() as HTMLElement;
            this.state.parent?.appendChild(this.state.node);
            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.state.node?.remove();
            this.state.isSubscribed = false;
        }
    }

    render() {
        return new DOMParser().parseFromString(
            template({
                title: this.props.title,
            }),
            'text/html'
        ).body.firstChild;
    }
}

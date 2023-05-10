import { Component } from '@framework/component';
import template from '@components/list/list.pug';
import '@components/list/list.scss';

interface Props {
    parent?: HTMLElement;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement;
    node: HTMLElement | undefined;
}

export class List extends Component<Props, State> {
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
        if (!this.state.isSubscribed) {
            this.state.node?.remove();
            this.state.isSubscribed = false;
        }
    }

    getNode() {
        return this.state.node;
    }

    render() {
        return new DOMParser().parseFromString(template({}), 'text/html').body
            .firstChild;
    }
}

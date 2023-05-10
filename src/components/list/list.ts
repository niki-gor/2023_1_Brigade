import { Component } from '@/components/component';
import template from '@components/list/list.pug';
import '@components/list/list.scss';

export class List extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            parent: this.props.parent,
            node: undefined,
            isSubscribed: false,
        };
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.node = this.render();

            this.state.parent.appendChild(this.state.node);
            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (!this.state.isSubscribed) {
            this.state.node.remove();
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

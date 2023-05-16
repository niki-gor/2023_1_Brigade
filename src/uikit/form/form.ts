import '@uikit/form/form.scss';
import template from '@uikit/form/form.pug';
import { Component } from '@framework/component';

interface Props {
    className?: string;
    parent: HTMLElement;
}

interface State {}

export class Form extends Component<Props, State> {
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

    getNode() {
        return this.node;
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const className = `${this.props.className ?? ''}`.trim();

        return new DOMParser().parseFromString(
            template({
                className,
            }),
            'text/html'
        ).body.firstChild;
    }
}

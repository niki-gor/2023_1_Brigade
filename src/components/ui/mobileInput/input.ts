import { Component } from '@framework/component';
import template from '@components/ui/mobileInput/input.pug';
import '@components/ui/mobileInput/input.scss';

interface Props {
    parent?: HTMLElement;
    placeholder?: string;
    className?: string;
    uniqClassName?: string;
    errors?: ErrorTypes[];
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement;
    node: HTMLElement | undefined;
}

export class MobileInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parent: this.props?.parent,
            node: this.render() as HTMLElement,
            isSubscribed: true,
        };

        if (this.state.node) {
            this.state.parent?.appendChild(this.state.node);
        }
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
                Placeholder: this.props.placeholder,
                ClassName: this.props.className,
                UniqClassName: this.props.uniqClassName,
                Errors: this.props.errors,
            }),
            'text/html'
        ).body.firstChild;
    }
}

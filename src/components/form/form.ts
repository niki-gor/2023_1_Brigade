import { Component } from '@/framework/component';
import template from '@components/form/form.pug';
import '@components/form/form.scss';
import { MobileInput } from '@components/ui/mobileInput/input';

interface Props {
    parent?: HTMLElement;
}

interface State {
    isSubscribed: boolean;
    parent?: HTMLElement;
    node: HTMLElement | undefined;
    inputs: HTMLElement[] | null;
}

export class Form extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            parent: this.props.parent as HTMLElement,
            node: undefined,
            inputs: null,
            isSubscribed: false,
        };
    }

    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    render() {
        return template({
            inputs: [],
            submitBtn: '',
        });
    }
}

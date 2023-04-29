import { Component } from '@framework/component';
import template from '@components/error/error.pug';

export class DumbContact extends Component<Props> {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    render() {
        return template({});
    }
}

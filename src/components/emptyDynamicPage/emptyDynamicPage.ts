import { Component } from '@framework/component';
import template from '@components/emptyDynamicPage/emptyDynamicPage.pug';
import '@components/emptyDynamicPage/emptyDynamicPage.scss';

export class DumbEmptyDynamicPage extends Component<Props> {
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
        return template({
            helloMsg: 'Выберите чат',
        });
    }
}

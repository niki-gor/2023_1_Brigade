import { Component } from '@framework/component';
import template from '@components/emptyDynamicPage/emptyDynamicPage.pug';
import '@components/emptyDynamicPage/emptyDynamicPage.scss';

interface Props {}

interface State {
    isSubscribed: boolean;
}

export class DumbEmptyDynamicPage extends Component<Props, State> {
    constructor(props: Props) {
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

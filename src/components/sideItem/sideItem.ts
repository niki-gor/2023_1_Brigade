import template from '@components/sideItem/sideItem.pug';
import '@components/sideItem/sideItem.scss';
import { Component } from '@framework/component';

export class DumbSideItem extends Component<Props> {
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
            SideButton: this.props.navSvgIcon,
            ItemValue: this.props.navItemValue,
        });
    }
}

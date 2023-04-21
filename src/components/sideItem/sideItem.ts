import template from '@components/sideItem/sideItem.pug';
import '@components/sideItem/sideItem.scss';
import { Component } from '@components/component';

export class DumbSideItem extends Component {
    constructor(props: AnyObject) {
        super(props);
    }

    render() {
        return template({
            SideButton: this.props.navSvgIcon,
            ItemValue: this.props.navItemValue,
        });
    }
}

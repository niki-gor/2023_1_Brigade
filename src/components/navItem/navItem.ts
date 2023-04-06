import template from "@components/navItem/navItem.pug"
import "@components/navItem/navItem.scss"
import { Component } from "@/components/component";


export class DumbNavItem extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            NavButton: this.props.navSvgIcon,
            ItemValue: this.props.navItemValue,
        });
    }
}

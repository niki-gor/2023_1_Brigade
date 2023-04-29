import { Component } from "@components/component";
import template from "@components/dropdown/dropdown.pug"
import "@components/dropdown/dropdown.scss"
import { svgButtonUI } from "@components/ui/button/button";

export class Dropdown extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            icon: svgButtonUI.renderTemplate({svgClassName: this.props.icon}),
            list: this.props.list,
        })
    }
}
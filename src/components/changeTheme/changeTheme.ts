import template from "@components/changeTheme/changeTheme.pug"
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";

export class DumbChangeTheme extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            WhiteBtn: svgButtonUI.renderTemplate({svgClassName: this.props.changeTheme.white}),
            BlackBtn: svgButtonUI.renderTemplate({svgClassName: this.props.changeTheme.black}),
        });
    }
}
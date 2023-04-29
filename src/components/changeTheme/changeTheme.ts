import template from '@components/changeTheme/changeTheme.pug';
import { Component } from '@/framework/component';
import { svgButtonUI } from '@components/ui/button/button';

export class DumbChangeTheme extends Component {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    render() {
        return template({
            WhiteBtn: svgButtonUI.renderTemplate({
                svgClassName: this.props.white,
            }),
            BlackBtn: svgButtonUI.renderTemplate({
                svgClassName: this.props.black,
            }),
        });
    }
}

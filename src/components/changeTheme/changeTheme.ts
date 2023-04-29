import template from '@components/changeTheme/changeTheme.pug';
import { Component } from '@framework/component';
import { svgButtonUI } from '@components/ui/button/button';

export class DumbChangeTheme extends Component<Props> {
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
            WhiteBtn: svgButtonUI.renderTemplate({
                svgClassName: this.props.white,
            }),
            BlackBtn: svgButtonUI.renderTemplate({
                svgClassName: this.props.black,
            }),
        });
    }
}

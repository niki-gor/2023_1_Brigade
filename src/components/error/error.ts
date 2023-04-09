import template from "@components/error/error.pug"
import "@components/error/error.scss";
import { Component } from "@components/component";
import { svgButtonUI } from "@components/ui/button/button";

export class DumbError extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            BackButton: svgButtonUI.renderTemplate({svgClassName: 'error-back-button'}),
            Header: this.props.errorHeader,
            Description: this.props.errorDescription,
        });
    }
}
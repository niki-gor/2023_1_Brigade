import { Component } from "@components/component";
import template from "@components/error/error.pug";
import "@components/error/error.scss";

export class DumbError extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            ErrorName: this.props.error.errorName,
            ErrorDescr: this.props.error.errorDescr,
        });
    }
}
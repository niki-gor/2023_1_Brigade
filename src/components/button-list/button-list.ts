import template from '@components/button-list/button-list.pug';
import { Component } from '@components/component';
import { svgButtonUI } from '@components/ui/button/button';

export class ButtonList extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            ListClassName: this.props.listClassName,
            ButtonClassName: this.props.btnClassName,
            Buttons: { ...this.props.buttons },
        });
    }
}

import template from '@components/ui/button/button.pug';
import '@components/ui/button/button.scss';
import { Component } from '@framework/component';

interface Props {}

interface State {}

export class svgButtonUI extends Component<Props, State> {
    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    static renderTemplate(args: { svgClassName: string }) {
        return template(args);
    }
}

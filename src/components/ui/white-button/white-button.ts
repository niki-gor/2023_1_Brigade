import { Component } from '@framework/component';
import '@components/ui/white-button/white-button.scss';
import template from '@components/ui/white-button/white-button.pug';

export class whiteButtonUI extends Component<Props> {
    static renderTemplate(args: { className: string; buttonValue: string }) {
        return template(args);
    }
}

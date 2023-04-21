import { Component } from '@components/component';
import '@components/ui/white-button/white-button.scss';
import template from '@components/ui/white-button/white-button.pug';

export class whiteButtonUI extends Component {
    static renderTemplate(args: { className: string; buttonValue: string }) {
        return template(args);
    }
}

import { Component } from '@components/component';
import template from '@components/error/error.pug';

export class DumbContact extends Component {
    constructor(props: AnyObject) {
        super(props);
    }

    render() {
        return template({});
    }
}

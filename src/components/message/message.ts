import { Component } from '@/framework/component';
import template from '@components/message/message.pug';
import '@components/message/message.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';

export class Message extends Component {
    constructor(props: AnyObject) {
        super(props);
    }

    render() {
        return template({
            Side: this.props.messageSide,
            MessageAvatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props.messageAvatar,
                altMsg: this.props.username,
            }),
            MessageText: this.props.messageContent,
            Username: this.props.username,
        });
    }
}

import { Component } from "@components/component";
import template from "@components/message/message.pug"
import "@components/message/message.scss"

export class Message extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log('props: ', this.props);
        return template({
            Side: this.props.messageSide, // boolean
            MessageAvatar: this.props.messageAvatar,
            MessageText: this.props.messageBody,
            Username: this.props.username,
        })
    }
}
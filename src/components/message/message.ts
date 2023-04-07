import { Component } from "@components/component";
import template from "@components/message/message.pug"
import "@components/message/message.scss"

export class Message extends Component {
    constructor(props: any) {
        super(props);
        console.log('Message props: ', this.props);
    }

    render() {
        return template({
            Side: this.props.messageSide, // boolean
            MessageAvatar: this.props.messageAvatar,
            MessageText: this.props.messageContent, // messageBody
            Username: this.props.username,
        })
    }
}
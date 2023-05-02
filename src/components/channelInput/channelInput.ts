import { Component } from "@/components/component";
import template from "@components/channelInput/channelInput.pug";
import "@components/channelInput/channelInput.scss";

export class DumbChatCard extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
           Caption: this.props.inputCaptioin,
           Placeholder: this.props.inputPlaceholder,
        });
    }
}
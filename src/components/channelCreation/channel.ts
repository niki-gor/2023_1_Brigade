import template from "@components/channelCreation/channel.pug"
import "@components/channelCreation/channel.scss";
import { Component } from "@components/component";


export class DumbCreateChannel extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            ChannelNameInput: '',
            ChannelImage: '',
        });
    }
}
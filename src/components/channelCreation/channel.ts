import template from "@components/channelCreation/channel.pug"
import "@components/channelCreation/channel.scss";
import { Component } from "@components/component";
import { ChannelInput } from "@components/channelInput/channelInput";
import { ellipseIconUI } from "@components/ui/ellipse-icon/ellipse-icon";


export class DumbCreateChannel extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            NameInput: new ChannelInput({
                inputCaptioin: "Название",
                inputPlaceholder: "Введите название канала",
            }).render(),
            DescrInput: new ChannelInput({
                inputCaptioin: "Описание",
                inputPlaceholder: "Введите описание канала",
            }).render(),
            ChannelAvatar: ellipseIconUI.renderTemplate({imgSrc: "./assets/img/logo.png", altMsg: "Channel avatar"})
        });
    }
}
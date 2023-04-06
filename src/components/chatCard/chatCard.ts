import { Component } from "@/components/component";
import template from "@components/chatCard/chatCard.pug";
import "@components/chatCard/chatCard.scss";
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";

export class DumbChatCard extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            avatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props.avatar,
                altMsg: this.props.title,
            }),
            title: this.props.title,
            lastMessage: this.props.last_message?.body,
            id: this.props.id,
        });
    }
}

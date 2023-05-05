import { Component } from "@components/component";
import template from "@components/message/message.pug"
import "@components/message/message.scss"
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";
import { Dropdown } from "@components/dropdown/dropdown";

export class Message extends Component {
    constructor(props: any) {
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
            TreeDots: function(message_id: number, is_user: boolean) { 
                if (is_user) { 
                    return new Dropdown({
                        icon: "three-dots",
                        list: [
                            {
                                className: "edit-message",
                                value: "Изменить",
                            },
                            {
                                className: "delete-message",
                                value: "Удалить",
                            }
                        ],
                        id: message_id
                    }).render();
                }
                return '';
            }(this.props.id, this.props.messageSide),
            id: this.props.id,
        })
    }
}
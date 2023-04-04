import { Component } from "@/components/component";
import template from "@components/contact/contact.pug";
import "@components/contact/contact.scss"
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";

export class DumbContact extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            avatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props.avatar,
                altMsg: this.props.nickname,
            }),
            nickname: this.props.nickname,
            status: this.props.status,
        });
    }
}

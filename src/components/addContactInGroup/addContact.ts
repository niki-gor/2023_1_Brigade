import { Component } from "@components/component";
import template from "@components/addContactInGroup/addContact.pug"
import { DumbContact } from "@components/contact/contact";
import { smallEllipseIconUI } from "../ui/small-ellipse-icon/small-ellipse-icon";

export class DumbAddContactInGroup extends Component {
    constructor(props: any) {
        super(props);
    }

    getGroupMembers() {
        const members: DumbContact[] = [];

        for (let member of this.props?.membersList) {
            members.push(new DumbContact({
                avatar: smallEllipseIconUI.renderTemplate({
                    imgSrc: member.avatar,
                    altMsg: member.nickname,
                }),
                nickname: member.nickname,
                status: member.status,
                id: member.id,
            }).render());
        }

        return members;
    }

    render() {
        return template({
            GroupChangeForm: this.props.groupChangeForm,
            GroupMembers:  this.getGroupMembers(),
        })
    }
}
import { Component } from "@components/component";
import template from "@components/addContactInGroup/addContact.pug"
import { DumbContact } from "@components/contact/contact";

export class DumbAddContactInGroup extends Component {
    constructor(props: any) {
        super(props);
    }

    getGroupMembers() {
        const members: DumbContact[] = [];
        console.log('DumbContact', this.props.membersList);
        

        // avatar: smallEllipseIconUI.renderTemplate({
        //     imgSrc: this.props.avatar,
        //     altMsg: this.props.nickname,
        // }),
        // nickname: this.props.nickname,
        // status: this.props.status,
        // id: this.props.id,
    }

    render() {
        return template({
            GroupChangeForm: this.props.groupChangeForm,
            GroupMembers:  this.getGroupMembers(),
        })
    }
}
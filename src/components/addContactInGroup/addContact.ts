import { Component } from "@components/component";
import template from "@components/addContactInGroup/addContact.pug"
import { DumbContact } from "@components/contact/contact";
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";
import "@components/addContactInGroup/addContact.scss"
import "@components/createGroup/createGroup.scss"
import { dataInputUI } from "@components/ui/data-input/data-input";
import { blueButtonUI } from "@components/ui/blue-button/blue-button";

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
            GroupName: this.props.groupName,
            GroupNameInput: dataInputUI.renderTemplate({
                className: 'groupName',
                inputType: 'text',
                inputPlaceholder: 'новое имя группы',
                value: '',
            }),
            CreateGroupButton: blueButtonUI.renderTemplate({
                className: 'button-submit',
                buttonValue: 'Сохранить изменения',
            }),
            GroupMembers:  this.getGroupMembers(),
            GroupMembersHeader: 'Members',
        })
    }
}
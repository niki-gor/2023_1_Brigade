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

    getContactList() {
        const contacts: DumbContact[] = [];
        for (const contact in this.props?.contactList) {
            contacts.push(new DumbContact({
                avatar: this.props?.contactList[contact].avatar,
                nickname: this.props?.contactList[contact].nickname,
                status: this.props?.contactList[contact].status,
                id: this.props?.contactList[contact].id,
            }).render());
        }

        return contacts;
    }

    render() {
        return template({
            GroupName: 'Название', // this.props.groupName
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
            Contacts:  this.getContactList(),
            GroupMembersHeader: 'Контакты',
        })
    }
}
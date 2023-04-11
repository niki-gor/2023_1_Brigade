import { Component } from "@components/component";
import template from "@components/addContactInGroup/addContact.pug"
import { DumbContacts } from "../contacts/contacts";

export class DumbAddContactInGroup extends Component {
    constructor(props: any) {
        super(props);
    }

    getGroupMembers() {
        // const messages: Member[] = [];
    }

    render() {
        return template({
            GroupChangeForm: this.props.groupChangeForm,
            GroupMembers:  new DumbContacts({
                headContactsValue: 'Участники',
            }),
        })
    }
}
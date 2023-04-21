import { Component } from "@/components/component";
import { DumbContact } from "@components/contact/contact";
import template from "@components/createGroup/createGroup.pug";
import "@components/createGroup/createGroup.scss";
import "@components/addContactInGroup/addContact.scss";
import { dataInputUI } from "@components/ui/data-input/data-input";
import { blueButtonUI } from "@components/ui/blue-button/blue-button";

export class DumbCreateGroup extends Component {
    constructor(props: any) {
        super(props);
    }

    getContactsList() {
        const contactsList: string[] = [];

        for (const key in this.props) {
            const contactUI = new DumbContact(this.props[key]);

            contactsList.push(contactUI.render());
        }

        return contactsList;
    }

    render() {
        return template({
            groupNameLabel: "Название группы",
            groupNameInput: dataInputUI.renderTemplate({
                className: "groupName",
                inputType: "text",
                inputPlaceholder: "",
                value: "",
            }),
            buttonCreateGroup: blueButtonUI.renderTemplate({
                className: "button-submit",
                buttonValue: "Создать группу",
            }),
            headContacts: "Контакты",
            contacts: this.getContactsList(),
        });
    }
}

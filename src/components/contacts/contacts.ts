import { Component } from "@/components/component";
import { DumbContact } from "@components/contact/contact"
import { whiteButtonUI } from "@components/ui/white-button/white-button"
import { smallEllipseIconUI } from "@components/ui/small-ellipse-icon/small-ellipse-icon";

import template from "@components/contacts/contacts.pug";
import "@components/contacts/contacts.scss"

export class DumbContacts extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            headContacts: this.props.headContacts.label,
            contacts: this.props.contacts,
            // contacts:[
            //         DumbContact.renderTemplate({
            //         avatar: smallEllipseIconUI.renderTemplate({
            //             imgSrc: this.props.contacts[0].avatar,
            //             altMsg: 'avatar'
            //         }),
            //         nickname: this.props.contacts[0].nickname,
            //         status: this.props.contacts[0].status,
            //     })
            // ],
            addContactButton: whiteButtonUI.renderTemplate({
                className: this.props.addContactButton.className,
                buttonValue: this.props.addContactButton.buttonValue,
            })
        });
    }
}

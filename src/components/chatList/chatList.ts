import { Component } from "@/components/component";
import template from "@components/chatList/chatList.pug";
import "@components/chatList/chatList.scss"
import { DumbChatCard } from "@components/chatCard/chatCard";

export class DumbChatList extends Component {
    constructor(props: any) {
        super(props);
    }

    getChatList() {
        let contactsList: string[] = [];
        
        for (const key in this.props) {
            const chatCardUI = new DumbChatCard(this.props[key]);

            contactsList.push(chatCardUI.render());
        }

        return contactsList;
    }

    render() {
        return template({
            headChats: 'Чаты',
            chats: this.getChatList(),
        });
    }
}

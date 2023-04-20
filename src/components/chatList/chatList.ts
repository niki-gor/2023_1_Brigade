import { Component } from "@/components/component";
import template from "@components/chatList/chatList.pug";
import "@components/chatList/chatList.scss"
import { DumbChatCard } from "@components/chatCard/chatCard";
import { svgButtonUI } from "@components/ui/button/button";
import { searchUi } from "@components/search/search";

export class DumbChatList extends Component {
    constructor(props: any) {
        super(props);
    }

    getChatList() {
        let chatsList: string[] = [];
        
        for (const key in this.props) {
            const chatCardUI = new DumbChatCard(this.props[key]);

            chatsList.push(chatCardUI.render());
        }

        return chatsList;
    }

    render() {
        return template({
            headChats: 'Чаты', // this.props.chatType ('Диалоги', 'Группы', 'Каналы');
            createCroup: svgButtonUI.renderTemplate({ svgClassName: 'chat-list__header__write-message-button' }),
            chatInput: new searchUi({
                inputClassName: "chats__header__input",
                placeholder: "Поиск"
            }).render(),
            chats: this.getChatList(),
        });
    }
}

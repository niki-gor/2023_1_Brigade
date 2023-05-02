import { Component } from "@/components/component";
import template from "@components/chatList/chatList.pug";
import "@components/chatList/chatList.scss"
import { DumbChatCard } from "@components/chatCard/chatCard";
import { searchUi } from "@components/search/search";
import { Dropdown } from "@components/dropdown/dropdown";

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
            headChats: 'Чаты',
            dropdown: new Dropdown({
                icon: "create-btn",
                list: [{
                    className: "dropdown-menu__item-group",
                    value: "Создать группу",
                },
                // {
                //     className: "dropdown-menu__item-channel",
                //     value: "Создать канал",
                // }
            ],
            }).render(),
            chatInput: new searchUi({
                inputClassName: "chats__header__input",
                placeholder: "Поиск"
            }).render(),
            chats: this.getChatList(),
        });
    }
}

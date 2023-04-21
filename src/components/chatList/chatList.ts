import { Component } from '@components/component';
import template from '@components/chatList/chatList.pug';
import '@components/chatList/chatList.scss';
import { DumbChatCard } from '@components/chatCard/chatCard';
import { svgButtonUI } from '../ui/button/button';

export class DumbChatList extends Component {
    constructor(props: AnyObject) {
        super(props);
    }

    getChatList() {
        const contactsList: string[] = [];

        for (const key in this.props) {
            const chatCardUI = new DumbChatCard(this.props[key]);

            contactsList.push(chatCardUI.render());
        }

        return contactsList;
    }

    render() {
        return template({
            headChats: 'Чаты',
            createCroup: svgButtonUI.renderTemplate({
                svgClassName: 'chat-list__header__write-message-button',
            }),
            chats: this.getChatList(),
        });
    }
}

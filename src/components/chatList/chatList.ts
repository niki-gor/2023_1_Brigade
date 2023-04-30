import { Component } from '@framework/component';
import template from '@components/chatList/chatList.pug';
import '@components/chatList/chatList.scss';
import { DumbChatCard } from '@components/chatCard/chatCard';
import { svgButtonUI } from '../ui/button/button';

interface Props {
    chats: Chat[];
}

interface State {
    isRendered: boolean;
}

export class DumbChatList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    getChatList() {
        const contactsList: string[] = [];

        this.props?.chats.forEach((chat) => {
            const chatCardUI = new DumbChatCard({ chat });

            contactsList.push(chatCardUI.render());
        });

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

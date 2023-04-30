import { Component } from '@framework/component';
import { store } from '@store/store';
import { createGetChatsAction } from '@actions/chatActions';
import { DumbChatList } from '@components/chatList/chatList';
import {
    createMoveToChatAction,
    createMoveToCreateGroupAction,
} from '@actions/routeActions';
import { STATIC } from '@config/config';

interface Props {
    user?: User;
    chats?: Chat[];
}

interface State {
    isSubscribed: boolean;
    domElements: {
        chats: HTMLElement | null;
        createGroup: HTMLElement | null;
    };
}

export class SmartChatList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                chats: null,
                createGroup: null,
            },
        };

        this.node = STATIC;
    }

    render() {
        if (this.state?.isSubscribed && this.props?.user) {
            if (!this.props?.chats) {
                this.props.chats = [];
            }

            const ChatListUI = new DumbChatList({
                chats: this.props?.chats,
            });

            if (this.node) {
                this.node.innerHTML = ChatListUI.render();
            }

            this.state.domElements.chats = document.querySelector('.chats');
            this.state.domElements.chats?.addEventListener('click', (e) => {
                let chat = e?.target as HTMLElement | null | undefined;
                chat = chat?.closest('.chat-card');

                if (chat) {
                    this.handleClickOpenChat(chat);
                    e.preventDefault();
                }
            });

            this.state.domElements.createGroup = document.querySelector(
                '.chat-list__header__write-message-button'
            );
            this.state.domElements.createGroup?.addEventListener(
                'click',
                (e) => {
                    e.preventDefault();

                    store.dispatch(createMoveToCreateGroupAction());
                }
            );
        }
    }

    componentDidMount() {
        if (!this.state?.isSubscribed) {
            this.unsubscribe = store.subscribe(
                this.constructor.name,
                (pr: Props) => {
                    this.props = pr;

                    this.render();
                }
            );

            if (this.state?.isSubscribed === false) {
                this.state.isSubscribed = true;
            }

            store.dispatch(createGetChatsAction());
        }
    }

    componentWillUnmount() {
        if (this.state?.isSubscribed) {
            this.unsubscribe();
            this.state.isSubscribed = false;
        }
    }

    handleClickOpenChat(chat: HTMLElement) {
        const chatStringId = chat.getAttribute('name');

        if (chatStringId) {
            const chatId = parseInt(chatStringId);

            this.props?.chats?.forEach((chat) => {
                if (chat.id === chatId) {
                    store.dispatch(createMoveToChatAction({ chatId }));
                }
            });
        }
    }
}

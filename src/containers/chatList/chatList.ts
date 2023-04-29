import { Component } from '@framework/component';
import { store } from '@store/store';
import { createGetChatsAction } from '@actions/chatActions';
import { DumbChatList } from '@components/chatList/chatList';
import {
    createMoveToChatAction,
    createMoveToCreateGroupAction,
} from '@actions/routeActions';
import { STATIC } from '@config/config';

export interface SmartChatList {
    state: {
        isSubscribed: boolean;
        domElements: {
            chats: HTMLElement | null;
            createGroup: HTMLElement | null;
        };
    };
}

export class SmartChatList extends Component<Props> {
    constructor(props: Record<string, unknown>) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                chats: null,
                createGroup: null,
            },
        };

        this.rootNode = STATIC;
    }

    render() {
        if (this.state.isSubscribed && this.props.user) {
            if (!this.props.chats) {
                this.props.chats = [];
            }

            const ChatListUI = new DumbChatList(this.props.chats);

            this.rootNode.innerHTML = ChatListUI.render();

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
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(
                store.subscribe(
                    this.constructor.name,
                    (pr: Record<string, unknown>) => {
                        this.props = pr;

                        this.render();
                    }
                )
            );

            this.state.isSubscribed = true;

            store.dispatch(createGetChatsAction());
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

    handleClickOpenChat(chat: HTMLElement) {
        const chatId = chat.getAttribute('name');

        for (const key in this.props.chats) {
            if (this.props.chats[key].id == chatId) {
                store.dispatch(
                    createMoveToChatAction({ chatId: this.props.chats[key].id })
                );
                break;
            }
        }
    }
}

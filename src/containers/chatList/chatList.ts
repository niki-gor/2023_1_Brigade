import { Container } from "@containers/container";
import { store } from "@store/store";
import { createGetChatsAction, createGetOneChatAction } from "@/actions/chatActions";
import { DumbChatList } from "@/components/chatList/chatList";
import { createMoveToChatAction, createMoveToCreateGroupAction } from "@/actions/routeActions";

export interface SmartChatList {
    state: {
        isSubscribed: boolean,
        domElements: {
            chats: HTMLElement | null,
            createGroup: HTMLElement | null,
        },
    }
}

export class SmartChatList extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                chats:  null,
                createGroup: null,
            }
        }
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
                e.preventDefault();
                const chat = e.target as HTMLElement;
                
                this.handleClickOpenChat(chat);
            });

            this.state.domElements.createGroup = document.querySelector('.chat-list__header__write-message-button');
            this.state.domElements.createGroup?.addEventListener('click', (e) => {
                e.preventDefault();
                
                store.dispatch(createMoveToCreateGroupAction());
            });
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));

            this.state.isSubscribed = true;

            store.dispatch(createGetChatsAction())
        }
    }
    
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

    handleClickOpenChat(chat: HTMLElement) {
        if (chat.classList.contains('chat-card')) {
            const chatId = chat.getAttribute('name');

            console.log('chats: ', this.props.chats);

            for (const key in this.props.chats) {
                if (this.props.chats[key].id == chatId) {
                    store.dispatch(createMoveToChatAction({ chatId: this.props.chats[key].id }));
                    break;
                }
            }
        }
    }
}

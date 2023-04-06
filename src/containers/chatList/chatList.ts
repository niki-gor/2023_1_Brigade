import { Container } from "@containers/container";
import { store } from "@store/store";
import { createGetChatsAction, createGetOneChatAction } from "@/actions/chatActions";
import { DumbChatList } from "@/components/chatList/chatList";

export interface SmartChatList {
    state: {
        isSubscribed: boolean,
        domElements: {
            headContacts: HTMLElement | null,
            contacts: HTMLElement | null,
            addContactButton: HTMLElement | null,
        },
    }
}

export class SmartChatList extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                headContacts:  null,
                contacts: null,
                addContactButton:  null,
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

            this.state.domElements.contacts = document.querySelector('.chats');
            this.state.domElements.contacts?.addEventListener('click', (e) => {
                e.preventDefault();
                const chat = e.target as HTMLElement;
                
                this.handleClickOpenChat(chat);
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
            const chatID = chat.getAttribute('name');

            //TODO:
            for (const key in this.props.chats) {
                if (this.props.chats[key].id == chatID) {
                    store.dispatch(createGetOneChatAction(this.props.chats[key]));
                    break;
                }
            }
        }
    }
}

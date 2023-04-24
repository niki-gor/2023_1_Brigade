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
            createBtn: HTMLElement | null,
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
                createBtn: null,
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

            // **** dropdown component
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');

            dropdownToggle?.addEventListener('click', () => {
                dropdownMenu?.classList.toggle('show');
            });
              
            // Закрываем выпадающее меню при клике вне его области
            window.addEventListener('click', (event) => {
                if (event.target instanceof Node && !dropdownToggle?.contains(event.target) && !dropdownMenu?.contains(event.target)) {
                    dropdownMenu?.classList.remove('show');
                }
            });
            // ****

            this.state.domElements.chats = document.querySelector('.chats');
            this.state.domElements.chats?.addEventListener('click', (e) => {
                let chat = e?.target as HTMLElement | null | undefined;
                chat = chat?.closest('.chat-card');
                
                if (chat) {
                    this.handleClickOpenChat(chat);
                    e.preventDefault();
                }
            });

            this.state.domElements.createBtn = document.querySelector('.chat-list__header__write-message-button');
            this.state.domElements.createBtn?.addEventListener('click', (e) => {
                
                
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
                store.dispatch(createMoveToChatAction({ chatId: this.props.chats[key].id }));
                break;
            }
        }
    }
}

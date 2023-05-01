import { DumbChatList } from "@/components/chatList/chatList";
import { store } from "@/store/store";
import { Container } from "@containers/container";

export interface SmartList {
    state: {
        isSubscribed: boolean,
        domElements: {
            list: HTMLElement | null,
        },
    }
}

// свернуть list, развернуть list
export class SmartList extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                list:  null,
            }
        }
    }

    render() {
        if (this.state.isSubscribed && this.props.headerText && this.props.headerIcon && this.props.itemType) {
            if (!this.props.chats) {
                this.props.chats = [];
            }
            
            const ChatListUI = new DumbChatList(this.props.chats); // DumbList - состоит из header: svgButton(arrow), CardList(card)
            this.rootNode.innerHTML = ChatListUI.render();
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));

            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

    handleClickedСollapseList() {

    }
}


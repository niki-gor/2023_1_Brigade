import { DumbChatList } from "@/components/chatList/chatList";
import { store } from "@/store/store";
import { Container } from "@containers/container";

export interface SmartChannelList {
    state: {
        isSubscribed: boolean,
        domElements: {
            list: HTMLElement | null,
        },
    }
}

export class SmartChannelList extends Container {
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
        if (this.state.isSubscribed) {
            if (!this.props.channels) {
                this.props.channels = [];
            }
            
            const ChannelListUI = new DumbChatList(this.props.channel);
            this.rootNode.innerHTML = ChannelListUI.render();
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
}


import { DumbChatList } from "@components/chatList/chatList";
import { DYNAMIC } from "@config/config";
import { store } from "@store/store";
import { Container } from "@containers/container";
import { DumbCreateChannel } from "@components/channelCreation/channel";

export interface SmartCreateChannel {
    state: {
        isSubscribed: boolean,
        domElements: {
            headerBackBtn: HTMLElement | null,
            headerDoneBtn: HTMLElement | null,
        },
    }
}

export class SmartCreateChannel extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                headerBackBtn: null,
                headerDoneBtn: null,
            }
        }

        this.rootNode = DYNAMIC;
    }

    render() {
        if (this.state.isSubscribed) {
            if (!this.props.channels) {
                this.props.channels = [];
            }
            
            const ChannelUI = new DumbCreateChannel({
                ...this.props.contacts,
            });

            this.rootNode.innerHTML = ChannelUI.render();
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


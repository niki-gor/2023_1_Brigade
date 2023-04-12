import { DumbAddContactInGroup } from "@/components/addContactInGroup/addContact";
import { store } from "@/store/store";
import { Container } from "@containers/container";

export interface SmartAddUserInGroup {
    state: {
        isSubscribed: boolean,
        domElements: {
            saveChangesBtn: HTMLElement | null;
        }
    }
}


export class SmartAddUserInGroup extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                saveChangesBtn: null,
            },
        }
    }

    render() {
        console.log('add user component render method has been called: ');
        if (this.state.isSubscribed) { //&& this.props.contacts && this.props.groupId && this.props.openedChat
            const addUser = new DumbAddContactInGroup({
                groupName: this.props?.openedChat?.title,
                groupChangeForm: 'Change group',
                membersList: this.props?.openedChat?.members,
            });

            this.rootNode.innerHTML = addUser.render();
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) { // TODO: && this.props?.contacts
            this.state.isSubscribed = true;

            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));
            // TODO: store.dispatch(createAddUserInChatAction());
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }
}
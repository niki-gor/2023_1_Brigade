import { createGetContactsAction } from "@/actions/contactsActions";
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
        // console.log('add user component render method has been called: ');
        console.log('props: ', this.props);
        if (this.state.isSubscribed) { //&& this.props.contacts && this.props.groupId && this.props.openedChat
            const addUser = new DumbAddContactInGroup({
                groupName: this.props?.openedChat?.title,
                contactList: this.props?.contacts,
            });

            this.rootNode.innerHTML = addUser.render();

            this.state.domElements.saveChangesBtn = document.querySelector('.button-submit');
            const input = document.querySelector('.groupName') as HTMLInputElement;

            this.state.domElements.saveChangesBtn?.addEventListener('click', (e) => {
                e.preventDefault();

                this.handleClickSaveButton(input);
            });
        }
    }

    handleClickSaveButton(input: HTMLInputElement) {
        let groupTitle = document.querySelector('.change-group__name');
        if (input.value && groupTitle) {
            groupTitle.textContent = input.value;
            // TODO: store.dispatch(createAddUserInChatAction());
        }
        input.value = '';
    }

    componentDidMount() {
        if (!this.state.isSubscribed) { // TODO: && this.props?.contacts
            this.state.isSubscribed = true;

            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));
        }

        store.dispatch(createGetContactsAction());
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }
}
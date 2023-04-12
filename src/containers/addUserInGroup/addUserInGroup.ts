import { createEditChatAction } from "@/actions/chatActions";
import { createGetContactsAction } from "@/actions/contactsActions";
import { DumbAddContactInGroup } from "@/components/addContactInGroup/addContact";
import { ChatTypes } from "@/config/enum";
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

        console.log('chat id', this.props?.openedChat.id);
    }

    #contactClicked  = 'rgb(37, 37, 48)';
    #contactUnClicked = 'rgb(28, 28, 36)';

    render() {
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

            document.querySelectorAll('.contact').forEach((contact: any) => {
                contact.style.backgroundColor = this.#contactUnClicked;
                contact.addEventListener('click', (e: any) => {
                    e.preventDefault()

                    this.handleClickChooseContact(contact);
                });
            });
        }
    }

    handleClickSaveButton(input: HTMLInputElement) {
        let groupTitle = document.querySelector('.change-group__name');
        if (input.value && groupTitle) {
            groupTitle.textContent = input.value;
            const choseContacts = [
                ...this.getChoseContacts(),
                this.props.user.id
            ];

            console.log('openChatId: ', this.props?.openedChat.id);

            const updateGroupState = {
                id: this.props?.openedChat.id, // скорее всего id мне чата мне даня должен вернуть
                type: ChatTypes.Group,
                title: input?.value,
                members: choseContacts,
            }

            console.log('before state: ', store.getState());
            store.dispatch(createEditChatAction(updateGroupState)); // TODO: передаем input.value, newMembers[] из выбранных contacts
            console.log('after state: ', store.getState());
        }
        input.value = '';
    }

    /**
     * Выбор контакта из списка контактов
     */
    handleClickChooseContact(contact: any) {
        if (contact.style.backgroundColor == this.#contactUnClicked) {
            contact.style.backgroundColor = this.#contactClicked;
        } else {
            contact.style.backgroundColor = this.#contactUnClicked;
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
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

    getChoseContacts() {
        let contacts: number[] = [];
        document.querySelectorAll('.contact').forEach((contact: any) => {
            if (contact.style.backgroundColor == this.#contactClicked) {
                const contactID = contact.getAttribute('name');
                contacts.push(Number(contactID));
            }
        });

        return contacts;
    }
}
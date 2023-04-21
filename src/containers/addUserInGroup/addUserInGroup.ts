import { createEditChatAction } from "@actions/chatActions";
import { createGetContactsAction } from "@actions/contactsActions";
import { DumbAddContactInGroup } from "@components/addContactInGroup/addContact";
import { DYNAMIC } from "@config/config";
import { ChatTypes } from "@config/enum";
import { store } from "@store/store";
import { Container } from "@containers/container";

export interface SmartAddUserInGroup {
    state: {
        isSubscribed: boolean;
        domElements: {
            saveChangesBtn: HTMLElement | null;
        };
    };
}

export class SmartAddUserInGroup extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                saveChangesBtn: null,
            },
        };

        this.chatId = this.props.chatId;
        this.rootNode = DYNAMIC;
    }

    #contactClicked = "rgb(37, 37, 48)";
    #contactUnClicked = "rgb(28, 28, 36)";

    render() {
        if (this.state.isSubscribed) {
            for (const key in this.props.chats) {
                if (this.props.chats[key].id == this.chatId) {
                    const addUser = new DumbAddContactInGroup({
                        groupName: this.props.chats[key].title,
                        contactList: this.props?.contacts,
                    });

                    this.rootNode.innerHTML = addUser.render();

                    this.state.domElements.saveChangesBtn =
                        document.querySelector(".button-submit");
                    const input = document.querySelector(
                        ".groupName"
                    ) as HTMLInputElement;
                    input.value = this.props.chats[key].title;

                    this.state.domElements.saveChangesBtn?.addEventListener(
                        "click",
                        (e) => {
                            e.preventDefault();

                            this.handleClickSaveButton(input);
                        }
                    );

                    const matchesId: number[] | string[] =
                        this.#findContactsByMessageId();
                    document.querySelectorAll(".contact").forEach((ct) => {
                        const contact = ct as HTMLElement;

                        contact.style.backgroundColor = this.#contactUnClicked;
                        for (const id of matchesId) {
                            if (id == contact.getAttribute("name")) {
                                this.handleClickChooseContact(contact);
                            }
                        }

                        contact.addEventListener("click", (e) => {
                            e.preventDefault();
                            this.handleClickChooseContact(contact);
                        });
                    });

                    break;
                }
            }
        }
    }

    #findContactsByMessageId(): number[] | string[] {
        // TODO: ужас, но надежно
        const matchesId: number | string[] = [];
        for (const index in this.props?.openedChat?.members) {
            for (const contactIndex in this.props?.contacts) {
                if (
                    this.props?.openedChat?.members[index].id ==
                    this.props?.contacts[contactIndex].id
                ) {
                    matchesId.push(this.props?.openedChat?.members[index].id);
                }
            }
        }
        return matchesId;
    }

    handleClickSaveButton(input: HTMLInputElement) {
        const groupTitle = document.querySelector(".change-group__name");
        let updateChatId;
        if (input.value && groupTitle) {
            groupTitle.textContent = input.value;
            const choseContacts = [
                ...this.getChoseContacts(),
                this.props.user.id,
            ];

            for (const index in this.props.chats) {
                if (this.props.chats[index]?.id == this.props.openedChat?.id) {
                    updateChatId = this.props.chats[index].id;
                }
            }

            const updateGroupState = {
                id: updateChatId,
                type: ChatTypes.Group,
                title: input?.value,
                members: choseContacts,
            };

            store.dispatch(createEditChatAction(updateGroupState));
        }
        input.value = "";
    }

    /**
     * Выбор контакта из списка контактов
     */
    handleClickChooseContact(contact: HTMLElement) {
        if (contact.style.backgroundColor == this.#contactUnClicked) {
            contact.style.backgroundColor = this.#contactClicked;
        } else {
            contact.style.backgroundColor = this.#contactUnClicked;
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.state.isSubscribed = true;

            this.unsubscribe.push(
                store.subscribe(this.name, (pr: ComponentProps) => {
                    this.props = pr;

                    this.render();
                })
            );
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
        const contacts: number[] = [];
        document.querySelectorAll(".contact").forEach((ct) => {
            const contact = ct as HTMLElement;

            if (contact.style.backgroundColor == this.#contactClicked) {
                const contactID = contact.getAttribute("name");
                contacts.push(Number(contactID));
            }
        });

        return contacts;
    }
}

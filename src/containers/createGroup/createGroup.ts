import { Container } from "@containers/container";
import { store } from "@/store/store";
import { addErrorToClass, checkNickname } from "@/utils/validator";
import { countingMembersErrorTypes, nicknameErrorTypes } from "@/config/errors";
import { DumbCreateGroup } from "@/components/createGroup/createGroup";
import { createCreateGroupAction } from "@actions/groupActions";
import { ChatTypes } from "@config/enum";
import { createGetContactsAction } from "@/actions/contactsActions";
import { createMoveToChatAction, createMoveToChatsAction } from "@/actions/routeActions";


export interface SmartCreateGroup {
    state: {
        isSubscribed: boolean,
        domElements: {
            groupNameLabel:    HTMLElement      | null,
            groupNameInput:    HTMLInputElement | null,
            buttonCreateGroup: HTMLElement      | null,
            contacts:          HTMLElement      | null,
        },
        valid: {
            groupNameIsValid: boolean,
            countersMembers:  boolean,
            isValid: () => boolean,
        },
    }
}

/**
 * Отрисовывает логин.
 * Прокидывает actions в стору для логина
 * Также подписывается на изменения статуса логина,
 * для корректного рендера ошибки
 *
 */
export class SmartCreateGroup extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */

    #contactClicked  = 'rgb(37, 37, 48)';
    #contactUnClicked = 'rgb(28, 28, 36)';

    constructor(props :componentProps) {
        super(props);

        this.state = {
            isSubscribed: false,
            domElements: {
                groupNameLabel:    null,
                groupNameInput:    null,
                buttonCreateGroup: null,
                contacts:          null,
            },
            valid: {
                groupNameIsValid: false,
                countersMembers:  false,
                isValid: () => {
                    return this.state.valid.groupNameIsValid &&
                           this.state.valid.countersMembers;
                },
            },
        };
    }

    /**
     * Рендерит создание группы
     */
    render() {
         if (this.state.isSubscribed) {
            const CreateGroupUI = new DumbCreateGroup({
                ...this.props.contacts,
            });

            this.rootNode.innerHTML = CreateGroupUI.render();

            //TODO через target, выбирается только какой-то фрагмент контакта

            document.querySelectorAll('.contact').forEach((contact: any) => {
                contact.style.backgroundColor = this.#contactUnClicked;
                contact.addEventListener('click', (e: any) => {
                    e.preventDefault()

                this.handleClickChooseContact(contact)
                });
            });

            this.state.domElements.buttonCreateGroup = document.querySelector('.button-submit');
            this.state.domElements.buttonCreateGroup?.addEventListener('click', (e) => {
                e.preventDefault();

                this.validateChoseContacts();
                this.handleClickCreateGroup();
            });

            this.state.domElements.groupNameInput = document.querySelector('.groupName');
            this.state.domElements.groupNameInput?.addEventListener('input', (e) => {
                e.preventDefault();

                this.validateGroupName();
            });
         }
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

    /**
     * Обрабатывает нажатие кнопки создания чата
     */
    handleClickCreateGroup() {
        if (this.state.valid.isValid()) {
            const choseContacts = [
                ...this.getChoseContacts(),
                this.props.user.id
            ];
            
            const contacts = {
                type: ChatTypes.Group,
                title: this.state.domElements.groupNameInput?.value,
                members: choseContacts,
            }

            store.dispatch(createCreateGroupAction(contacts));
            store.dispatch(createMoveToChatsAction());
        }
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.name, (pr: componentProps) => {
                this.props = pr;

                this.render();
            }));

            this.state.isSubscribed = true;
        }

        store.dispatch(createGetContactsAction());
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

    /**
     * Проверяет, что для создания группы выбрано > 0 участников
     */
    validateChoseContacts() {
        this.state.domElements.groupNameInput?.classList.remove('data-input--error');
        addErrorToClass('', countingMembersErrorTypes);

        const contacts = this.getChoseContacts()

        if (contacts.length === 0) {
            this.state.domElements.groupNameInput?.classList.add('data-input--error');
            addErrorToClass('incorrect-emptyCountingMembers', countingMembersErrorTypes);
            this.state.valid.groupNameIsValid = false;
            return;
        }

        this.state.valid.countersMembers = true;
    }

    /**
     * Проверяет пользовательский ввод названия чата
     */
    validateGroupName() {
        this.state.domElements.groupNameInput?.classList.remove('data-input--error');
        addErrorToClass('', nicknameErrorTypes);

        const { isError, errorClass } = checkNickname(this.state.domElements.groupNameInput?.value ?? '');

        if (isError) {
            this.state.domElements.groupNameInput?.classList.add('data-input--error');
            addErrorToClass(errorClass, nicknameErrorTypes);
            this.state.valid.groupNameIsValid = false;
            return;
        }

        this.state.valid.groupNameIsValid = true;
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

import { Container } from "@containers/container";
import { store } from "@store/store";
import { createCreateDialogAction, createDeleteSearchedChatsAction, createGetChatsAction, createSearchChatsAction } from "@/actions/chatActions";
import { DumbChatList } from "@/components/chatList/chatList";
import { createMoveToChatAction, createMoveToCreateChannelAction, createMoveToCreateGroupAction } from "@/actions/routeActions";
import { STATIC } from "@/config/config";
import { List } from "@/components/list/list";
import { Component } from "@/components/component";
import { ChatItem } from "@/components/chat-item/chat-item";
import { TitleItem } from "@/components/title-item/title-item";
import { ContactItem } from "@/components/contact-item/contact-item";

export interface SmartChatList {
    state: {
        isSubscribed: boolean,
        domElements: {
            list: Component | null,
            items: Component[],
            input: HTMLInputElement | null,
            inputValue: string;
            chats: HTMLElement | null,
            createBtn: HTMLElement | null,
            dropdownToggle: HTMLElement | null,
            dropdownMenu: HTMLElement | null,
        },
        currentChat: number
    }
}

export class SmartChatList extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            domElements: {
                list: null,
                items: [],
                input: null,
                inputValue: '',
                chats:  null,
                createBtn: null,
                dropdownToggle: null,
                dropdownMenu: null,
            },
            currentChat: 0,
        }

        this.rootNode = STATIC;
    }

    throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
        let lastTime = 0;
        return function(this: any, ...args: Parameters<T>) {
            const currentTime = new Date().getTime();
            if (currentTime - lastTime > delay) {
                lastTime = currentTime;
                func.apply(this, args);
            }
        };
    }

    render() {
        if (this.state.isSubscribed && this.props.user) {
            if (!this.props.chats) {
                this.props.chats = [];
            }
            
            this.state.domElements.inputValue = this.state.domElements.input?.value ?? '';

            this.state.domElements.items?.forEach((item) => {
                item.componentWillUnmount();
            });
            if (this.state.domElements.items) {
                this.state.domElements.items = [];
            }

            this.state.domElements.list?.componentWillUnmount();
            // const list = new List({
            //     parent: this.rootNode,
            // })

            // list.componentDidMount();

            // this.props.chats.forEach((chat: anyObject) => {
            //     const chatItem = new ChatItem({
            //         chat,
            //         onClick: () => { console.log('onClick', chat.title)},
            //         parent: list.getNode()
            //     });

            //     chatItem.componentDidMount();
            // });

            // const uns = this.unsubscribe.pop();
            // if (uns) {
            //     uns();
            // }

            // const findContactsSelector = document.querySelector('.chats__header') as HTMLElement;
            // const findContactsInput = findContactsSelector?.querySelector('.chats__header__input__search') as HTMLInputElement;
            // findContactsInput?.addEventListener('input', this.throttle(() => {
            //     console.log(findContactsInput?.value);
            // }, 1000))


            // const findChatsSelector = document.querySelector('.chats__header__input flex') as HTMLElement;
            // const findChatsInput = findChatsSelector.querySelector('.chats__header__input__search') as HTMLInputElement;
            // findChatsInput?.addEventListener('input', this.throttle(() => {
            //     console.log(findChatsInput?.value);
            // }, 1000))

            const ChatListUI = new DumbChatList({});
            this.rootNode.innerHTML = ChatListUI.render();

            this.state.domElements.input = document.querySelector('.chats__header__input');
            if (this.state.domElements.input) {
                this.state.domElements.input.value = this.state.domElements.inputValue;
            }
            // this.state.domElements.dropdownToggle = document.querySelector('.dropdown-toggle');
            // this.state.domElements.dropdownMenu = document.querySelector('.dropdown-menu');
            
            this.state.domElements.input?.addEventListener('input', () => {
                this.handleSearch();
            })

            this.state.domElements.input?.addEventListener('focus', () => {
                this.handleInputFocus();
            })

            this.state.domElements.input?.addEventListener('blur', () => {
                this.handleInputBlur();
            })

            // this.state.domElements.dropdownToggle?.addEventListener('click', () => {
            //     this.state.domElements.dropdownMenu?.classList.toggle('show');
            // });

            // window.addEventListener('click', (event) => {
            //     if (event.target instanceof Node && !this.state.domElements.dropdownToggle?.contains(event.target)
            //         && !this.state.domElements.dropdownMenu?.contains(event.target)) {
            //         this.state.domElements.dropdownMenu?.classList.remove('show');
            //     }
            // });

            this.state.domElements.chats = document.querySelector('.empty_chats');
            if (this.state.domElements.chats) {
                this.state.domElements.chats.innerHTML = '';

                this.state.domElements.list = new List({
                    parent: this.state.domElements.chats
                });

                this.state.domElements.list?.componentDidMount();

                if (this.props.founded_channels ||
                    this.props.founded_chats   ||
                    this.props.founded_messages ||
                    this.props.founded_contacts) {
                        let titleItem = new TitleItem({
                            parent: this.state.domElements.list?.getNode(),
                            title: 'Контакты и чаты'
                        });
                        titleItem.componentDidMount();
                        this.state.domElements.items.push(titleItem);

                        this.props.founded_contacts?.forEach((contact: anyObject) => {
                            const contactItem = new ContactItem({
                                contact,
                                onClick: () => { 
                                    store.dispatch(createCreateDialogAction(contact));
                                    console.log(this.props.openedChat.id)
                                    if (this.state.domElements.input) {
                                        this.state.domElements.input.value = '';
                                    }
                                    store.dispatch(createDeleteSearchedChatsAction());
                                },
                                parent: this.state.domElements.list?.getNode(),
                                observe: ['founded_contacts'],
                            });
            
                            contactItem.componentDidMount();
        
                            this.state.domElements.items.push(contactItem);
                        });

                        this.props.founded_chats?.forEach((chat: anyObject) => {
                            let isCurrent = false;
                            if (chat.id == this.state.currentChat) {
                                isCurrent = true;
                            }
                            const chatItem = new ChatItem({
                                chat,
                                onClick: () => { 
                                    store.dispatch(
                                        createMoveToChatAction({ 
                                            chatId: chat.id 
                                        }));
                                    this.state.currentChat = chat.id;
                                    if (this.state.domElements.input) {
                                        this.state.domElements.input.value = '';
                                    }
                                    store.dispatch(createDeleteSearchedChatsAction());
                                },
                                parent: this.state.domElements.list?.getNode(),
                                observe: ['founded_chats'],
                                isCurrent
                            });
            
                            chatItem.componentDidMount();
        
                            this.state.domElements.items.push(chatItem);
                        });

                        titleItem = new TitleItem({
                            parent: this.state.domElements.list?.getNode(),
                            title: 'Новые каналы'
                        });
                        titleItem.componentDidMount();
                        this.state.domElements.items.push(titleItem);

                        this.props.founded_channels?.forEach((chat: anyObject) => {
                            let isCurrent = false;
                            if (chat.id == this.state.currentChat) {
                                isCurrent = true;
                            }
                            const chatItem = new ChatItem({
                                chat,
                                onClick: () => { 
                                    store.dispatch(
                                        createMoveToChatAction({ 
                                            chatId: chat.id 
                                        }));
                                    this.state.currentChat = chat.id;
                                    if (this.state.domElements.input) {
                                        this.state.domElements.input.value = '';
                                    }
                                    store.dispatch(createDeleteSearchedChatsAction());
                                },
                                parent: this.state.domElements.list?.getNode(),
                                observe: ['founded_channels'],
                                isCurrent
                            });
            
                            chatItem.componentDidMount();
        
                            this.state.domElements.items.push(chatItem);
                        });

                        titleItem = new TitleItem({
                            parent: this.state.domElements.list?.getNode(),
                            title: 'Сообщения'
                        });
                        titleItem.componentDidMount();
                        this.state.domElements.items.push(titleItem);

                        this.props.founded_messages?.forEach((chat: anyObject) => {
                            let isCurrent = false;
                            if (chat.id == this.state.currentChat) {
                                isCurrent = true;
                            }
                            const chatItem = new ChatItem({
                                chat,
                                onClick: () => { 
                                    store.dispatch(
                                        createMoveToChatAction({ 
                                            chatId: chat.id 
                                        }));
                                    this.state.currentChat = chat.id;
                                    if (this.state.domElements.input) {
                                        this.state.domElements.input.value = '';
                                    }
                                    store.dispatch(createDeleteSearchedChatsAction());
                                },
                                parent: this.state.domElements.list?.getNode(),
                                observe: ['founded_messages'],
                                isCurrent
                            });
            
                            chatItem.componentDidMount();
        
                            this.state.domElements.items.push(chatItem);
                        });

                        this.state.domElements.input?.focus();
                } else {
                    this.props.chats?.forEach((chat: anyObject) => {
                        this.state.currentChat = this.props.openedChat.id;
                        let isCurrent = false;
                        if (chat.id == this.state.currentChat) {
                            isCurrent = true;
                        }
                        const chatItem = new ChatItem({
                            chat,
                            onClick: () => { 
                                this.state.currentChat = chat.id;
                                store.dispatch(
                                    createMoveToChatAction({ 
                                        chatId: chat.id 
                                    }));
                            },
                            parent: this.state.domElements.list?.getNode(),
                            observe: ['chats'],
                            isCurrent
                        });
        
                        chatItem.componentDidMount();
    
                        this.state.domElements.items.push(chatItem);
                    })
                }
            }
            
            // this.state.domElements.chats?.addEventListener('click', (e) => {
            //     let chat = e?.target as HTMLElement | null | undefined;
            //     chat = chat?.closest('.chat-card');

            //     if (chat) {
            //         this.handleClickOpenChat(chat);
            //         e.preventDefault();
            //     }
            // });

            const group = window.document.querySelector('.dropdown-menu__item-group');
            const channel = window.document.querySelector('.dropdown-menu__item-channel');

            group?.addEventListener('click', () => {
                store.dispatch(createMoveToCreateGroupAction());
            })

            channel?.addEventListener('click', () => {
                store.dispatch(createMoveToCreateChannelAction());
            })
        }
    }

    handleInputFocus() {
    }

    handleInputBlur() {
    }

    handleSearch() {
        if (this.state.domElements.input?.value.trim()) {
            store.dispatch(createSearchChatsAction(this.state.domElements.input?.value.trim()));
        } else {
            store.dispatch(createDeleteSearchedChatsAction());
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
            store.dispatch(createDeleteSearchedChatsAction());
            this.state.domElements.items?.forEach((item) => {
                item.componentWillUnmount();
            });
            if (this.state.domElements.items) {
                this.state.domElements.items = [];
            }
            this.state.domElements.list?.componentWillUnmount();
            this.state.domElements.list = null;
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

import { constantsOfActions } from '@config/actions';

export const reduceIsNotRendered = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.isNotRendered:
            return {
                ...state,
                openedChat: {
                    ...state.openedChat,
                    isNotRendered: false,
                } as OpenedChat,
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceAddChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addChat:
            const payload = action.payload as Chat;
            if (action.payload) {
                if (!state.chats) {
                    return {
                        ...state,
                        chats: [payload],
                    };
                }

                state.chats.push(payload);
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceSetChats = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setChats:
            return {
                ...state,
                chats: action.payload as Chat[],
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceOpenChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.openChat:
            return {
                ...state,
                openedChat: {
                    ...action.payload,
                    isNotRendered: true,
                } as OpenedChat,
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteChat:
            const payload = action.payload as Chat;

            if (payload?.id) {
                state.chats = state.chats?.filter(
                    (chat) => chat.id != payload?.id
                );
            }
        default:
            return {
                ...state,
            };
    }
};

// reducer вызывается при сохранения изменений в chat-е
export const reduceEditChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.editChat:
            const payload = action.payload as Chat;

            const index = state.chats?.findIndex((chat) => {
                return chat.id == payload.id;
            });

            console.log(index);

            if ((index && index !== -1) || index === 0) {
                state.chats?.splice(index, 1, {
                    ...state.chats[index],
                    title: payload.title,
                    members: payload.members,
                });
            }

        default:
            return {
                ...state,
            };
    }
};

export const reduceSetSearchedChats = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setSearchedChats:
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload,
                };
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteSearchedChats = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteSearchedChats:
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload,
                };
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceAddUserInChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addUserInChat:
            if (action.payload) {
                state?.openedChat?.members.push(action.payload);

                state.chats.push({
                    id: state?.openedChat?.id,
                    title: state?.openedChat?.title,
                    avatar: state?.openedChat?.avatar,
                    members: state?.openedChat?.members,
                    last_message:
                        state?.openedChat?.messages[
                            state?.openedChat?.messages.length - 1
                        ],
                });
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteUserInChat = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteUserInChat:
            for (let i = 0; i < state.openedChat.members.length; ++i) {
                if (state.openedChat.members[i].id === state?.user?.id) {
                    state.openedChat.members.splice(i, 1);
                }
            }
            state.chats = state.chats?.filter(
                (chat: Chat) => chat.id != state.openedChat?.id
            );
        default:
            return {
                ...state,
            };
    }
};

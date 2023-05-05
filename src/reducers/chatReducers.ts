import { constantsOfActions } from "@/config/actions";

export const reduceIsNotRendered = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.isNotRendered:
            return {
                ...state,
                openedChat: {
                    ...state.openedChat,
                    isNotRendered: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceAddChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addChat:
            const payload = action.payload;
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

export const reduceSetChats = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setChats:
            return {
                ...state,
                chats: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceOpenChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.openChat:
            console.log('master: ', action?.payload?.master_id)
            // console.log('user: ', action?.payload?.user_id)
            if (!action.payload?.messages) {
                action.payload = {
                    ...action.payload,
                    messages: [],
                };
            }
            return {
                ...state,
                openedChat: {
                    ...action.payload,
                    isNotRendered: true,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteChat:
            const payload = action.payload;

            if (payload?.id) {
                state.chats = state.chats?.filter(
                    (chat: anyObject) => chat.id != payload?.id
                );
            }
        default:
            return {
                ...state,
            };
    }
}

// reducer вызывается при сохранения изменений в chat-е
export const reduceEditChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.editChat:
            const payload = action.payload;

            const index = state.chats?.findIndex((chat: anyObject) => {
                return chat.id == payload?.id;
            });

            if ((index && index !== -1) || index === 0) {
                state.chats?.splice(index, 1, {
                    ...state.chats[index],
                    title: payload?.title,
                    members: payload?.members,
                });
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceSetSearchedChats = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setSearchedChats:
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload
                };
            }
        default:
            return {
                ...state,
            };
    }
}

export const reduceDeleteSearchedChats = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteSearchedChats:
            if (action.payload) {
                return {
                    ...state,
                    ...action.payload
                };
            }
        default:
            return {
                ...state,
            };
    }
}

export const reduceAddUserInChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addUserInChat:
            if (action.payload) {
                state?.openedChat?.members.push(action.payload);

                state.chats.push({
                    id: state?.openedChat?.id,
                    title: state?.openedChat?.title,
                    avatar: state?.openedChat?.avatar,
                    members: state?.openedChat?.members,
                    last_message: state?.openedChat?.messages[-1],
                });
            }
        default:
            return {
                ...state,
            }
    }
}

export const reduceDeleteUserInChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteUserInChat:
            for (let i = 0; i < state.openedChat.members.length; ++i) {
                if (state.openedChat.members[i].id === state?.user?.id) {
                    state.openedChat.members.splice(i, 1);
                }
            }
            state.chats = state.chats?.filter(
                (chat: anyObject) => chat.id != state.openedChat?.id
            );
        default:
            return {
                ...state,
            }
    }
}
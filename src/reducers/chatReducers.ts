import { constantsOfActions } from "@config/actions";

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
            if (!action.payload && !state.chats) {
                return {
                    ...state,
                    chats: [],
                };
            } else if (!state.chats) {
                return {
                    ...state,
                    chats: {
                        [action.payload?.id]: action.payload,
                    },
                };
            }

            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload?.id]: action.payload,
                },
            };
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
            if (action.payload?.id) {
                for (const key in state.chats) {
                    if (state.chats[key].id == action.payload?.id) {
                        delete state.chats[key];
                    }
                }
            }
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

// reducer вызывается при сохранения изменений в chat-е
export const reduceEditChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.editChat:
            for (const index in state.chats) {
                if (state.chats[index].id == action.payload?.id) {
                    return {
                        ...state,
                        chats: {
                            ...state.chats,
                            [index]: {
                                ...state.chats[index],
                                title: action.payload?.title,
                                members: action.payload?.members,
                            },
                        },
                    };
                }
            }
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    }
};

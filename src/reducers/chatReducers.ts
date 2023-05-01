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

                console.log(state.chats?.[index]);
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

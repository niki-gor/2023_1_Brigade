import { constantsOfActions } from "@/config/actions";

export const reduceAddChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addChat:
            if (!action.payload && !state.chats) {
                return {
                    ...state,
                    chats: [],
                }
            } else if (!state.chats) {
                return {
                    ...state,
                    chats: {
                        [action.payload?.id]: action.payload,
                    },
                } 
            }
            
            return {
                ...state,
                chats: { 
                    ...state.chats, 
                    [action.payload?.id]: action.payload,
                },
            }
        default:
            return {
                ...state,
            }
    }
};

export const reduceSetChats = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setChats:
            return {
                ...state,
                chats: action.payload,
            }
        default:
            return {
                ...state,
            }
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
                openedChats: [ action.payload, ],
                openChatNow: action.payload?.id,
            };
        default:
            return {
                ...state,
            }
    }
}

export const reduceCreateMessage = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.sendMessage:
            return {
                ...state,
                openedChats: {
                    ...state.openedChats,
                    [state.openChatNow]: {
                        ...state.openedChats[state.openChatNow],
                        messages: {
                            ...state.openedChats[state.openChatNow].messages,
                            [state.openedChats[state.openChatNow].messages.length]: action.payload,
                        }
                    }
                },
            }
        default:
            return {
                ...state,
            }
    }
}

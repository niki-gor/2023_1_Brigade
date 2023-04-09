import { constantsOfActions } from "@/config/actions";
import { Chats } from "@/containers/chatList/createChatList";

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

export const reduceDeleteChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteChat:
            if (action.payload?.chatId) {
                const index = state.chats.findIndex((chat: {id: number}) => chat.id === action.payload?.chatId);

                if (index !== -1) {
                    state.chats.splice(index, 1);
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
}

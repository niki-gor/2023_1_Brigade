import { constantsOfActions } from "@/config/actions";

export const reduceAddChat = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.addChat:
            if (!action.payload) {
                return {
                    ...state,
                    chats: [],
                }
            }
            return {
                ...state,
                chats: { ...action.payload },
            };
        default:
            return {
                ...state,
            }
    }
};

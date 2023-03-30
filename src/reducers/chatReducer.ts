export const reduceChat = (state, action) => {
    switch (action.type) {
    case 'AUTH' || 'LOGIN' || 'SIGNUP':
        return {
            ...state,
            user: action.user,
        };
    default:
        return {
            ...state,
        };
    }
};

export const reduceAuth = (state, action) => {
    switch (action.type) {
    case 'AUTH':
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

export const reduceLogin = (state, action) => {
    switch (action.type) {
    case 'LOGIN':
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

export const reduceSignUp = (state, action) => {
    switch (action.type) {
    case 'SIGNUP':
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

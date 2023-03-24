export const reduceInit = (state, action) => {
    switch (action.type) {
    case 'INIT':
        return { };
    default:
        return {
            ...state,
        };
    }
};

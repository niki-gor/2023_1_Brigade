export default (state, action) => {
    switch (action.type) {
    case 'INIT':
        return { };
    default:
        return {
            ...state,
        };
    }
};

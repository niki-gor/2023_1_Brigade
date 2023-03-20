export const createAuthAction = (user) => ({
    type: 'AUTH',
    payload: user,
});

export const createLoginAction = (user) => ({
    type: 'LOGIN',
    payload: user,
});

export const createSignUpAction = (user) => ({
    type: 'SIGNUP',
    payload: user,
});

import { constantsOfActions } from "@/config/actions";
// TODO: костыли, которые заменятся роутером
// import { SmartSignUp } from "@/containers/signUp/signUp";
// import { store } from "@/store/store";
// import { ROOT } from "@/config/config";
// import { SmartLogin } from "@/containers/login/login";

export const createMoveToSignUpAction = () : Action => {
    // TODO: костыли, которые заменятся роутером
    // const signup = new SmartSignUp({...store.getState(), rootNode: ROOT });
    // signup.componentDidMount();

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    }
};

export const createMoveToLoginAction = () : Action => {
    // TODO: костыли, которые заменятся роутером
    // const login = new SmartLogin({...store.getState(), rootNode: ROOT });
    // login.componentDidMount();

    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    }
};

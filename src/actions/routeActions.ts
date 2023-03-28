import { constantsOfActions } from "@/config/actions";

export const createMoveToSignUpAction = () : Action => {
    

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    }
};

export const createMoveToLoginAction = () => {

    
    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    }
};

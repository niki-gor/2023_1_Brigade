import { constantsOfActions } from "@/config/actions";
import { router } from "@/router/router";

export const createMoveToSignUpAction = () : Action => {
    router.route('/signup');

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    }
};

export const createMoveToLoginAction = () : Action => {
    router.route('/login');

    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    }
};

export const createRenderAction = () : Action => {
    return {
        type: constantsOfActions.render,
        payload: null,
    }
}

import { ROOT } from "@/config/config";
// import { SmartLogin } from "@/containers/login/login";
import { SmartSignUp } from "@/containers/signUp/signUp";
import { store } from "@/store/store";

export interface ComponentTemplate {
    componentWillUnmount: Function;
    componentDidMount: Function;
}

export interface Route {
    path: string,
    component: ComponentTemplate | undefined,
}

export const routes = new Map<string, ComponentTemplate> ([
    // ["/", new SmartSignUp({ ...store.getState(), rootNode: ROOT }) ], // TODO: SmartLogin->SmartChat
    // ["/login/", new SmartLogin({ ...store.getState(), rootNode: ROOT })],
    // ["/signup/", new SmartSignUp({ ...store.getState(), rootNode: ROOT })],
    // ["/chat/:id/", new SmartLogin({ ...store.getState(), rootNode: ROOT }) ], // TODO: SmartLogin->SmartChatID
]);

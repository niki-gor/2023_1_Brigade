import { DYNAMIC, ROOT } from "@/config/config";
import { SmartLogin } from "@/containers/login/login";
import { SmartSignUp } from "@/containers/signUp/signUp";
import { SmartProfile } from "@/containers/profile/profile";
import { store } from "@/store/store";
import { SmartChat } from "@/containers/chat/chat";
import { SmartCreateGroup } from "@/containers/createGroup/createGroup";

export interface ComponentTemplate {
    componentWillUnmount: Function;
    componentDidMount: Function;
}

export interface Route {
    path: string,
    component: ComponentTemplate | undefined,
}

export interface DynamicUrl {
    path: string,
    dynamicParam: string,
}

export const appRoutes = new Map<string, Route>();
appRoutes.set('/login', { path: '/login', component: new SmartLogin({ ...store.getState(), rootNode: ROOT })});
appRoutes.set('/signup', { path: '/signup', component: new SmartSignUp({ ...store.getState(), rootNode: ROOT })});
appRoutes.set('/profile', { path: '/profile', component: new SmartProfile({ ...store.getState(), rootNode: DYNAMIC })});
appRoutes.set('/create_group', { path: '/create_group', component: new SmartCreateGroup({ ...store.getState(), rootNode: DYNAMIC })});
appRoutes.set('/', { path: '/', component: new SmartChat({ ...store.getState(), rootNode: DYNAMIC })});

export const dynamicUrlsRegex: RegExp[] = [
    /^\/([a-z0-9_-]+)$/i,
    /^\/([a-z0-9_-]+)\/add$/i,
];

export enum dynamicComponent {
    chatId,
    chatAdd,
}

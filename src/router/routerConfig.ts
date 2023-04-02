import { ROOT } from "@/config/config";
import { SmartLogin } from "@/containers/login/login";
import { SmartProfile } from "@/containers/profile/profile";
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

export interface historyIterator {
    currentIndex: number;
    path: string;
}

export interface urlInfo {
    dynamicParams: Object;
}

export const publicPaths = new Map<string, Route>();
export const privatePaths = new Map<string, Route>();
publicPaths.set('/login', { path: '/login', component: new SmartLogin({ ...store.getState(), rootNode: ROOT })})
publicPaths.set('/signup', { path: '/signup', component: new SmartSignUp({ ...store.getState(), rootNode: ROOT })})
publicPaths.set('/profile', { path: '/profile', component: new SmartProfile({ ...store.getState(), rootNode: ROOT })})
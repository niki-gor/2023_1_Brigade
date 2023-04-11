import { DYNAMIC, ROOT } from "@/config/config";
import { SmartLogin } from "@/containers/login/login";
import { SmartSignUp } from "@/containers/signUp/signUp";
import { SmartProfile } from "@/containers/profile/profile";
import { store } from "@/store/store";
import { SmartChat } from "@/containers/chat/chat";
import { SmartCreateGroup } from "@/containers/createGroup/createGroup";
import { SmartAddUserInGroup } from "@/containers/addUserInGroup/addUserInGroup";

export interface ComponentTemplate {
    componentWillUnmount: Function;
    componentDidMount: Function;
}

export interface Route {
    path: string,
    component: ComponentTemplate | undefined,
}

// export interface urlInfo {
//     dynamicParams: Object;
// }

export interface urlInfo {
    dynamicParams: string | null;
}

export interface historyIterator {
    currentIndex: number;
    path: string;
}

export const appRoutes = new Map<string, Route>();
appRoutes.set('/login', { path: '/login', component: new SmartLogin({ ...store.getState(), rootNode: ROOT })})
appRoutes.set('/signup', { path: '/signup', component: new SmartSignUp({ ...store.getState(), rootNode: ROOT })})
appRoutes.set('/profile', { path: '/profile', component: new SmartProfile({ ...store.getState(), rootNode: DYNAMIC })})
appRoutes.set('/create_group', { path: '/create_group', component: new SmartCreateGroup({ ...store.getState(), rootNode: DYNAMIC })})
appRoutes.set('/', { path: '/', component: new SmartChat({ ...store.getState(), rootNode: DYNAMIC })})

export const getSmartChat = (id: string) => {
    return new SmartChat({ ...store.getState(), rootNode: DYNAMIC, chatId: id });
}

export const getSmartAddContactInGroup = (id: string) => {
    return new SmartAddUserInGroup({...store.getState(), rootNode: DYNAMIC, groupId: id});
}

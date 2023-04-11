import { DYNAMIC, ROOT } from "@/config/config";
import { SmartLogin } from "@/containers/login/login";
import { SmartSignUp } from "@/containers/signUp/signUp";
import { SmartProfile } from "@/containers/profile/profile";
import { store } from "@/store/store";
import { SmartChat } from "@/containers/chat/chat";
import { SmartCreateGroup } from "@/containers/createGroup/createGroup";
import { SmartAddUserInGroup } from "@/containers/addUserInGroup/addUserInGroup";
import { Container } from "@/containers/container";

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

// ***********************Test***************************
// function handleRequest(url: string) {
//     for (let dynamicUrl of dynamicUrlsRegex) {
//         const match = url.match(dynamicUrl);
//         if (match) {
//             console.log('path dynamic url: ', match[0]);
//         }
//         if (match) {
//             const dynamicParam = match[1];
//             return dynamicParam;
//         }
//     }
// }


// console.log('dynamic param: ', handleRequest('/123'));
// console.log('dynamic param: ', handleRequest('/123/add'));
// console.log('dynamic param: ', handleRequest('/chats/123/change'));

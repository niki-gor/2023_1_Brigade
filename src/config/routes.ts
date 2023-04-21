import { Route } from "@router/router";
import { SmartChat } from "@containers/chat/chat";
import { SmartCreateGroup } from "@containers/createGroup/createGroup";
import { SmartLogin } from "@containers/login/login";
import { SmartProfile } from "@containers/profile/profile";
import { SmartSignUp } from "@containers/signUp/signUp";
import { SmartAddUserInGroup } from "@containers/addUserInGroup/addUserInGroup";

export const routes: Route[] = [
    { path: /^\/login$/, component: SmartLogin, getProps: () => ({}) },
    { path: /^\/signup$/, component: SmartSignUp, getProps: () => ({}) },
    { path: /^\/profile$/, component: SmartProfile, getProps: () => ({}) },
    { path: /^\/create_group$/, component: SmartCreateGroup, getProps: () => ({}) },
    { path: /^\/$/, component: SmartChat, getProps: () => ({}) },
    { path: /^\/(\d+)$/, component: SmartChat, getProps: (params: string[]) => ({
        chatId: params[0],
    }) },
    { path: /^\/(\d+)\/add$/, component: SmartAddUserInGroup, getProps: (params: string[]) => ({
        chatId: params[0],
    }) },
]

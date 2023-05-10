import { Route } from '@router/router';
import { SmartChat } from '@containers/chat/chat';
import { SmartCreateGroup } from '@containers/createGroup/createGroup';
import { SmartLogin } from '@containers/login/login';
import { SmartProfile } from '@containers/profile/profile';
import { SmartSignUp } from '@containers/signUp/signUp';
import { SmartAddUserInGroup } from '@containers/group/group';

export const routes: Route[] = [
    {
        path: /^\/login$/,
        component: () => {
            return new SmartLogin({});
        },
    },
    {
        path: /^\/signup$/,
        component: () => {
            return new SmartSignUp({});
        },
    },
    {
        path: /^\/profile$/,
        component: () => {
            return new SmartProfile({});
        },
    },
    {
        path: /^\/create_group$/,
        component: () => {
            return new SmartCreateGroup({});
        },
    },
    {
        path: /^\/$/,
        component: () => {
            return new SmartChat({});
        },
    },
    {
        path: /^\/(\d+)$/,
        component: (params: string[] | undefined) => {
            if (params) {
                const props = {
                    chatId: parseInt(params[0]),
                };

                return new SmartChat(props);
            }
        },
    },
    {
        path: /^\/(\d+)\/add$/,
        component: (params: string[] | undefined) => {
            if (params) {
                const props = {
                    chatId: parseInt(params[0]),
                };

                return new SmartAddUserInGroup(props);
            }
        },
    },
];

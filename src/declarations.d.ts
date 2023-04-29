declare module '*.pug' {
    const _: (params: Record<string, unknown> | undefined) => string;
    export default _;
}

declare module '*.svg' {
    const _: string;
    export default _;
}

interface Action {
    type: string;
    payload: Record<string, unknown> | null | undefined;
}

interface AsyncAction {
    (dispatch: Dispatch, state: getState): Promise<void>;
}

interface Response {
    status: number;
    body: Record<string, unknown> | null | undefined;
}

interface Reducer {
    (state: Record<string, unknown>, action: Action): Record<string, unknown>;
}

interface GetState {
    (): Record<string, unknown>;
}

interface Callback {
    (props: Record<string, unknown>): void;
}

interface CreateStore {
    (reducers: Map<string, Reducer>): {
        getState: () => Record<string, unknown>;
        dispatch: (action: Action) => void;
        subscribe: (key: string, cb: Callback) => () => void;
    };
}

interface Store {
    getState: () => Record<string, unknown>;
    dispatch: (action: Action) => void;
    subscribe: (key: string, cb: Callback) => () => void;
}

interface Middleware {
    (store: Store): (
        dispatch: Dispatch
    ) => (action: Action | AsyncAction) => void;
}

interface Dispatch {
    (action: Action): void;
}

interface ErrorTypes {
    param: string;
    class: string;
    message: string;
}

interface User {
    id: number;
    username: string;
    nickname: string;
    email: string;
    status: string;
    avatar: string;
}

interface Contact {
    id: number;
    username: string;
    nickname: string;
    email: string;
    status: string;
    avatar: string;
}

interface Chat {
    id: number;
    type: number;
    title: string;
    avatar: string;
    members: [
        {
            id: number;
            username: string;
            nickname: string;
            email: string;
            status: string;
            avatar: string;
        }
    ];
    last_message: {
        id: number;
        body: string;
        chat_id: number;
        author_id: number;
    };
    last_message_author: {
        id: number;
        username: string;
        nickname: string;
        email: string;
        status: string;
        avatar: string;
    };
}

interface OpenedChat {
    id: number;
    master_id: number;
    type: number;
    title: string;
    avatar: string;
    description: string;
    members: [
        {
            id: number;
            username: string;
            nickname: string;
            email: string;
            status: string;
            avatar: string;
        }
    ];
    messages: [
        {
            id: number;
            body: string;
            chat_id: number;
            author_id: number;
        }
    ];
    isNotRendered: boolean;
}

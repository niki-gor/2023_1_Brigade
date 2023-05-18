declare module '*.pug' {
    const _: (any) => string;
    export default _;
}

declare module '*.svg' {
    const _: string;
    export default _;
}

interface Action {
    type: string;
    payload:
        | User
        | User[]
        | Chat
        | Chat[]
        | OpenedChat
        | Message
        | Record<string, boolean>
        | null
        | undefined
        | {
              id: number;
              type: ChatTypes;
              title: string;
              members: (number | undefined)[];
          }
        | Record<string, unknown>;
}

interface AsyncAction {
    (dispatch: Dispatch, state: GetState): Promise<void>;
}

interface Response {
    status: number;
    body: Record<string, unknown> | null | undefined;
}

interface Reducer {
    (state: State, action: Action): State;
}

interface GetState {
    (): State;
}

interface Callback {
    (props: State): void;
}

interface CreateStore {
    (reducers: Map<string, Reducer>): Store;
}

interface Store {
    getState: GetState;
    dispatch: Dispatch;
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

interface StoreState {
    user?: User;
    chats?: Chat[];
    contacts?: User[];
    openedChat?: OpenedChat;

    // Флаги, которые могут установиться на ответ от сервера
    invalidEmail?: boolean;
    occupiedEmail?: boolean;
    occupiedUsername?: boolean;
    incorrectPassword?: boolean;
}

interface User {
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
    members: User[];
    last_message: Message;
    last_message_author: User;
}

interface OpenedChat {
    id: number;
    master_id: number;
    type: number;
    title: string;
    avatar: string;
    description: string;
    members: User[];
    messages: Message[];
    isNotRendered: boolean;
}

interface Message {
    id: string;
    action: MessageActionType;
    type: MessageTypes;
    image_url: string;
    body: string;
    chat_id: number;
    author_id: number;
}

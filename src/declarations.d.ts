declare module '*.pug' {
    const _: (AnyObject) => string;
    export default _;
}

declare module '*.svg' {
    const _: string;
    export default _;
}

interface AnyObject {
    [key: string]: any;
}

// interface ComponentProps extends AnyObject {
//     rootNode: HTMLElement | null;
// }

interface Action extends AnyObject {
    type: string;
    payload: AnyObject | null | undefined;
}

interface AsyncAction {
    (dispatch: Dispatch, state: getState): Promise<void>;
}

interface Response extends AnyObject {
    status: number;
    body: AnyObject | null | undefined;
}

interface Reducer {
    (state: AnyObject, action: Action): AnyObject;
}

interface GetState {
    (): AnyObject;
}

interface Callback {
    (AnyObject): void;
}

interface CreateStore {
    (reducers: Map<string, Reducer>): {
        getState: () => AnyObject;
        dispatch: (action: Action) => void;
        subscribe: (key: string, cb: (pr: AnyObject) => void) => () => void;
    };
}

interface Store {
    getState: () => AnyObject;
    dispatch: (action: Action) => void;
    subscribe: (key: string, cb: (pr: AnyObject) => void) => () => void;
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

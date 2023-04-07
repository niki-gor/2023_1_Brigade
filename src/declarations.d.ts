declare module "*.pug" {
    const _: Function;
    export default _;
};

declare module "*.svg" {
    const _: string;
    export default _;
};

interface anyObject {
    [key: string]: any,
};

interface componentProps extends anyObject {
    rootNode: HTMLElement | null,
};

interface Action extends anyObject { 
    type: string,
    payload: anyObject | null | undefined,
}

interface AsyncAction {
    (dispatch: (action: Action) => void, state: Function) : Promise<void>,
}

interface Response extends anyObject {
    status: number,
    body: anyObject | null | undefined,
};

interface Reducer {
    (state: anyObject, action: Action) : anyObject,
}

interface CreateStore {
    (reducers: Map<string, Reducer>) : {
        getState: () => anyObject,
        dispatch: (action: Action) => void,
        subscribe: (key: string, cb: (pr: componentProps) => void) => () => void,
    }
}

interface Store {
    getState: () => anyObject,
    dispatch: (action: Action) => void,
    subscribe: (key: string, cb: (pr: componentProps) => void) => () => void,
}

interface Middleware {
    (store: any) : (dispatch: any) => (action: any) => any,
}

interface Dispatch {
    (action: Action) : void,
}

interface ErrorTypes {
    param: string,
    class: string,
    message: string,
}

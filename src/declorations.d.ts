declare module "*.pug" {
    const _: Function;
    export default _;
};

interface anyObject {
    [key: string]: any,
};

interface componentProps extends anyObject {
    rootNode: HTMLElement,
};

interface Action extends anyObject { 
    type: string, 
    payload: anyObject | null | undefined,
}

interface Response extends anyObject {
    status: number,
    body: anyObject | null | undefined,
};

interface Reducer {
    (anyObject, Action) : anyObject,
}

interface CreateStore {
    (reducers: Map<string, (state: anyObject, action: Action) => anyObject>) : {
        getState: () => anyObject,
        dispatch: (action: Action) => void,
        subscribe: (cb: () => void) => () => void,
    }
}

interface Store {
    getState: () => anyObject,
    dispatch: (action: Action) => void,
    subscribe: (cb: () => void) => () => void,
}

interface Middleware {
    (store: any) : (dispatch: any) => (action: any) => any,
}

interface Dispatch {
    (action: Action) : void,
}
const createWS = () => {
    let ws: any = undefined;

    const create = () => {
        ws = new WebSocket('wss://technogramm.ru/message/');
    }

    return () : WebSocket => {
        if (!ws) {
            create();
        }

        return ws;
    }
}

export const getWS = createWS();

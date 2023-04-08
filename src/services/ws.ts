const createWs = () => {
    let ws : WebSocket;

    const create = () => {
        ws = new WebSocket('ws://technogramm.ru/api/v1/message/');
    }

    return () : WebSocket => {
        if (!ws) {
            create();
        }

        return ws;
    }
}

export const getWs = createWs();

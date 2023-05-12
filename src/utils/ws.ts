const createWs = () => {
    let ws: WebSocket | undefined;
    const subscribers = new Map<number, (message: Message) => void>();

    const create = () => {
        ws = new WebSocket('wss://technogramm.ru/api/v1/message/');

        ws.onopen = () => {};

        // Обработчик события получения сообщения от сервера
        ws.onmessage = (event) => {
            const e = JSON.parse(event.data);
            const cb = subscribers.get(e.chat_id);
            if (cb) {
                cb(e);
            }
        };

        // Обработчик события закрытия соединения
        ws.onclose = () => {
            ws = undefined;
        };

        // Обработчик события ошибки соединения
        ws.onerror = () => {
            ws = undefined;
        };
    };

    return () => {
        if (!ws) {
            create();
        }

        return {
            send: (message: Message) => {
                ws?.send(JSON.stringify(message));
            },
            subscribe: (chatId: number, cb: (message: Message) => void) => {
                subscribers.set(chatId, cb);
                return () => {
                    subscribers.delete(chatId);
                };
            },
            close: () => {
                ws?.close();
            },
        };
    };
};

export const getWs = createWs();

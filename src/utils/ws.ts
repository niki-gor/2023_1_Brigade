const createWs = () => {
    let ws : WebSocket | undefined;
    let subscribers = new Map<number, Function>();

    const create = () => {
        ws = new WebSocket('wss://technogramm.ru/api/v1/message/');
        
        ws.onopen = (event) => {
            console.log('WebSocket connection opened');
        };
    
        // Обработчик события получения сообщения от сервера
        ws.onmessage = (event) => {
            const e = JSON.parse(event.data);
            const cb = subscribers.get(e.chat_id);
            console.log(e)
            if (cb) {
                cb(e);
            }
        };
    
        // Обработчик события закрытия соединения
        ws.onclose = (event) => {
            console.log('WebSocket connection closed', event.code);
            ws = undefined;
        };
    
        // Обработчик события ошибки соединения
        ws.onerror = (event) => {
            console.error('WebSocket connection error:', event);
            ws = undefined;
        };
    }

    return () => {
        if (!ws) {
            create();
        }

        return {
            send: (message: anyObject) => {
                ws?.send(JSON.stringify(message));
            },
            subscribe: (chatId: number, cb: (message: anyObject) => void) => {
                subscribers.set(chatId, cb);
                return () => {
                    subscribers.delete(chatId);
                }
            },
            close: () => {
                ws?.close();
            }
        };
    }
}

export const getWs = createWs();

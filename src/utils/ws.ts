const createWs = () => {
    let ws : WebSocket | undefined;
    let subscribers = new Map<number, Function>();

    const create = () => {
        ws = new WebSocket('wss://technogramm.ru/api/v1/message/');
        
        ws.onopen = (event) => {
            console.log('onopen')
        };
    
        // Обработчик события получения сообщения от сервера
        ws.onmessage = (event) => {
            const e = JSON.parse(event.data);
            const cb = subscribers.get(e.chat_id);
            if (cb) {
                cb(e);
            }
            console.log('onmessage')
        };
    
        // Обработчик события закрытия соединения
        ws.onclose = (event) => {
            ws = undefined;
            console.log('onclose')
        };
    
        // Обработчик события ошибки соединения
        ws.onerror = (event) => {
            ws = undefined;
            console.log('onerror')
        };
    }

    return () => {
        if (!ws) {
            create();
        }

        return {
            send: (message: anyObject) => {
                if (ws) {
                    ws.send(JSON.stringify(message));
                    console.log('onsend')
                }
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

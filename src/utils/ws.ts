export const addWsListeners = (ws: WebSocket) => {
    // Обработчик события открытия соединения
    ws.onopen = (event) => {
        console.log('WebSocket connection opened');
    };

    // Обработчик события получения сообщения от сервера
    ws.onmessage = (event) => {
        console.log('Message received from server:', event.data);
    };

    // Обработчик события закрытия соединения
    ws.onclose = (event) => {
        console.log('WebSocket connection closed');
    };

    // Обработчик события ошибки соединения
    ws.onerror = (event) => {
        console.error('WebSocket connection error:', event);
    };
}

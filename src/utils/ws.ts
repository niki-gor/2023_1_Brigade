export const addWsListeners = (ws: WebSocket) => {
    // Обработчик события открытия соединения
    ws.addEventListener('open', (event) => {
        console.log('WebSocket connection opened');
    });

    // Обработчик события получения сообщения от сервера
    ws.addEventListener('message', (event) => {
        console.log('Message received from server:', event.data);
    });

    // Обработчик события закрытия соединения
    ws.addEventListener('close', (event) => {
        console.log('WebSocket connection closed');
    });

    // Обработчик события ошибки соединения
    ws.addEventListener('error', (event) => {
        console.error('WebSocket connection error:', event);
    });
}

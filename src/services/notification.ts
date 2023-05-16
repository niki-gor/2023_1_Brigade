export function notify(title: string, message: string, icon: string) {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            tag: 'ache-mail',
            body: message,
            icon: icon,
        });
    }
}

// export const notify = (user: User, message: Message) => {
//     Notification.requestPermission((permission) => {
//         if (permission === 'granted') {
//             new Notification(user.nickname, {
//                 tag: message.id,
//                 body: message.body,
//                 icon: user.avatar,
//             });
//         }
//     });
// };

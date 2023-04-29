import {
    get,
    post,
    deleteSession,
    put,
    postMultipartForm,
} from '@services/ajax';
import { config } from '@config/api';

/**
 * Отправляет запрос авторизации и обрабатывает ответ
 */
export const auth = () => {
    return get(config.auth)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

/**
 * Отправляет запрос логина и обрабатывает ответ
 */
export const login = (body: Record<string, unknown>) => {
    return post(config.login, body)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 404:
                case 409:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

/**
 * Отправляет запрос регистрации и обрабатывает ответ
 */
export const signUp = (body: Record<string, unknown>) => {
    return post(config.signup, body)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 201:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 400:
                case 409:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

/**
 * Отправляет запрос выхода из текущего аккаунта и обрабатывает ответ
 */
export const logout = () => {
    return deleteSession(config.logout)
        .then(({ status }) => {
            switch (status) {
                case 204:
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

/**
 * Отправляет запрос обновления пользовательских данных и обрабатывает ответ
 */
export const updateUser = (body: Record<string, unknown>) => {
    return put(config.updateUser, body)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 400:
                case 401:
                case 404:
                case 409:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

/**
 * implementation request contacts
 */
export const getContacts = () => {
    return get(config.contacts)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const createChat = (body: Record<string, unknown>) => {
    return post(config.chats, body)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 201:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const getChats = () => {
    return get(config.chats)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const getOneChat = (chat: Record<string, unknown>) => {
    return get(config.chats + `${chat.chatId}/`)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 200:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 403:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const deleteChat = (deletedId: string) => {
    return deleteSession(config.chats + deletedId + '/')
        .then(({ status }) => {
            switch (status) {
                case 204:
                case 401:
                case 403:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const editChat = (body: Record<string, unknown>) => {
    return put(config.chats, body)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 201:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

export const uploadAvatar = (avatar: File) => {
    return postMultipartForm(config.uploadAvatar, avatar)
        .then(({ status, parsedBody }) => {
            switch (status) {
                case 201:
                    return {
                        status,
                        body: parsedBody,
                    };
                case 401:
                case 404:
                case 500:
                    return {
                        status,
                        body: null,
                    };
                default:
                    return {
                        status,
                        body: null,
                    };
            }
        })
        .catch((error) => {
            return {
                status: 0,
                body: error,
            };
        });
};

import {get, post, deleteSession, put, postMultipartForm} from '@services/ajax';
import { config } from '@config/api';
import * as timers from "timers";

/**
 * Отправляет запрос авторизации и обрабатывает ответ
 */
export const auth = () => {
    return get(
        config.auth,
    )
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
        }
    });
};

/**
 * Отправляет запрос логина и обрабатывает ответ
 */
export const login = (body: anyObject) => {
    return post(
        config.login,
        body,
    )
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
        }
    });
};

/**
 * Отправляет запрос регистрации и обрабатывает ответ
 */
export const signUp = (body: anyObject) => {
    return post(
        config.signup,
        body,
    )
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
        }
    });
};

/**
 * Отправляет запрос выхода из текущего аккаунта и обрабатывает ответ
 */
export const logout = () => {
    return deleteSession(
        config.logout,
    )
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
        }
    });
};

/**
 * Отправляет запрос обновления пользовательских данных и обрабатывает ответ
 */
export const updateUser = (body: anyObject) => {
    return put(
        config.updateUser,
        body,
    )
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
        }
    });
};

/**
 * implementation request contacts
 */
export const getContacts = () => {
    return get(
        config.contacts,
    )
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
            }
        });
};

export const createChat = (body: anyObject) => {
    return post(
        config.chats,
        body,
    )
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
        }
    });
};

export const getChats = () => {
    return get(
        config.chats,
    )
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
            }
        });
};

export const getOneChat = (chat: anyObject) => {
    return get(
        config.chats + `${chat.chatId}/`,
    )
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
            }
        });
};

export const deleteChat = (body: anyObject) => {
    return post(
        config.chats,
        body,
    )
    .then (({ status }) => {
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
        }
    })
}

export const uploadAvatar = (avatar: File | undefined) => {
    if (!avatar) {
        return
    }
    // const formData = new FormData();
    // formData.append('image', avatar);
    // console.log(formData)
    return postMultipartForm(
        config.uploadAvatar,
        avatar,
    )
        .then(({status}) => {
            switch (status) {
                case 201:
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
            }
        })
}

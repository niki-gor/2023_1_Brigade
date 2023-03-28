import { get, post, deleteSession } from '@services/ajax';
import { config } from '@config/api';

/**
 * implementation request authorization
 */
export const auth = () => {
    get(
        config.auth,
    )
    .then(({ status, parsedBody }) => {
        switch (status) {
        case 200:
            parsedBody?.then((body) => {
                return {
                    status,
                    body,
                };
            });

            return {
                status,
            };
        case 401:
        case 500:
            return {
                status,
            };
        default:
            return {
                status,
            };
        }
    });
};

/**
 * implementation request login
 */
export const login = (body: anyObject) => {
    post(
        config.login,
        body,
    )
    .then(({ status, parsedBody }) => {
        switch (status) {
        case 200:
            parsedBody?.then((body) => {
                return {
                    status,
                    body,
                };
            });
            
            return {
                status,
            };
        case 404:
        case 409:
        case 500:
            return {
                status,
            };
        default:
            return {
                status,
            };
        }
    });
};

/**
 * implementation request registration
 */
export const signUp = (body: anyObject) => {
    post(
        config.signup,
        body,
    )
    .then(({ status, parsedBody }) => {
        switch (status) {
        case 201:
            parsedBody?.then((body) => {
                return {
                    status,
                    body,
                };
            });
            return {
                status,
            };
        case 400:
        case 409:
        case 500:
            return {
                status,
            };
        default:
        }
    });
};

/**
 * implementation request logout
 */
export const logout = () => {
    deleteSession(
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
            };
        default:
            return {
                status,
            };
        }
    });
};

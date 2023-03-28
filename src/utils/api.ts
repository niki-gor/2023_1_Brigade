import { get, post, deleteSession } from '@services/ajax';
import { config } from '@config/api';
import { createAuthAction, createLoginAction } from '@actions/userActions';
import { store } from '@store/store';

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
        case 401 || 500:
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
        case 404 || 409 || 500:
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
        case 400 || 409 || 500:
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
        case 204 || 401 || 404 || 500:
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

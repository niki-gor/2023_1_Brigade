import { AJAX_METHODS } from '@config/ajax'

const BACKEND_URL = 'http://95.163.249.116:8081';
// const BACKEND_URL_LOCAL = 'http://127.0.0.1:8081'

/**
 * Отправляет HTTP запросы
 * @param {string} url - url
 * @param {string} method - HTTP метод
 * @param {json} body - тело запроса
 * @returns {Promise} - промис
 */
const ajax = (
    url: string, 
    method: string, 
    body: anyObject | null | undefined
) => {
    return fetch(BACKEND_URL + '/api/v1' + url, {
        method,
        headers: {
            Accept: 'application/json',
            Host: BACKEND_URL,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(body),
    })
        .then((response) => {
            const { status } = response;

            let parsedBody;
            if (status !== 204) {
                parsedBody = response.json();
            }

            return { status, parsedBody };
        })
        .catch((err) => {
            const { status } = err;
            
            let parsedBody;
            if (status !== 204) {
                parsedBody = err.json();
            }

            return { status, parsedBody };
        });
}

/**
 * Отправляет GET-запросы
 * @param {string} url - url
 * @returns {Promise} - промис
 */
export const get = (
    url: string
) => {
    return ajax(
        url,
        AJAX_METHODS.GET,
        undefined,
    );
}

/**
 * Отправляет POST-запросы
 * @param {string} url - url
 * @param {json} body - тело запроса
 * @returns {Promise} - промис
 */
export const post = (
    url: string,
    body: anyObject | null | undefined,
) => {
    return ajax(
        url, 
        AJAX_METHODS.POST,
        body,
    );
}

/**
 * Отправляет DELETE-запрос (удаляет текущую пользовательскую сессию)
 * @param {string} url - url
 * @returns {Promise} - тело запроса
 */
export const deleteSession = (
    url: string,
) => {
    return ajax(
        url,
        AJAX_METHODS.DELETE,
        null,
    );
}

/**
 * Отправляет PUT-запрос
 * @param {string} url - url
 * @param {json} body - тело запроса
 * @returns {Promise} - промис
 */
export const put = (
    url: string,
    body: anyObject | null | undefined,
): Promise<any> => {
    return ajax(
        url, 
        AJAX_METHODS.PUT,
        body,
    );
}

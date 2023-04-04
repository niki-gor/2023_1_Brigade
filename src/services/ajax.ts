import { AJAX_METHODS } from '@config/ajax'

const BACKEND_URL = 'http://127.0.0.1:8081'; // 'http://95.163.249.116:8081';
// const BACKEND_URL_LOCAL = 'http://127.0.0.1:8081'

/**
 * method implementing request work
 * @param {string} url - path url
 * @param {string} method - request method
 * @param {json} body - request data
 * @returns {Promise} - request promise
 */
const ajax = (
    url: string,
    method: string,
    body: anyObject | null | undefined
) => {
    return fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            Host: BACKEND_URL,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: body == null ? null : JSON.stringify(body),
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
 * method implementing GET request
 * @param {string} url - path url
 * @returns {Promise} - request promise
 */
export const get = (
    url: string
) => {
    return ajax(
        BACKEND_URL + url,
        AJAX_METHODS.GET,
        undefined,
    );
}

/**
 * method implementing POST request
 * @param {string} url - path url
 * @param {json} body - request data
 * @returns {Promise} - request promise
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
 * method implementing DELETE request
 * @param {string} url - path url
 * @returns {Promise} - request promise
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
 * method implementing PUT request
 * @param {string} url - path url
 * @param {json} body - request data
 * @returns {Promise} - request promise
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

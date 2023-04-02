// import {constantsOfActions} from "@config/actions";
import {contacts} from "@utils/api";
import {createContactsAction} from "@actions/contactsActions";

// export const createGetContactsAction = (state: anyObject) : Action => {
//     return {
//         type: constantsOfActions.getContacts,
//         payload: state,
//     }
// }

export const createGetContactsAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await contacts();
        let jsonBody = await body;

        switch (status) {
            case 200:
                return dispatch(createContactsAction(jsonBody));
            // case 400:
            //     return dispatch(createOccupiedUsernameAction());
            // case 401:
            // // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
            // case 404:
            // // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
            // case 409:
            //     return dispatch(createOccupiedUsernameAction());
            // case 500:
            // // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
            // case 0:
            // // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
            // default:
            // // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
}

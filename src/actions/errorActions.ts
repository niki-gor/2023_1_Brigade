import { constantsOfActions } from "@/config/actions";


export const createErrorAction = (name: number, descr: string) : Action => {
    return {
        type: constantsOfActions.error,
        payload: {
            errorName: name,
            errorDescr: descr,
        },
    }
}
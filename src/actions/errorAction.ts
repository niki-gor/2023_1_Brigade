import { constantsOfActions } from "@/config/actions"

export const createErrorAction = (error: anyObject) => {
    return {
        type: constantsOfActions.openError,
        payload: error,
    }
}
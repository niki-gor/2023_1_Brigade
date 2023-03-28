import { constantsOfActions } from "@/config/actions"

export const createSetStateAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setState,
        payload: state,
    }
}

export const createInvalidEmailAction = () : Action => {
    return {
        type: constantsOfActions.invalidEmail,
        payload: null,
    }
}

export const createOccupiedEmailAction = () : Action => {
    return {
        type: constantsOfActions.occupiedEmail,
        payload: null,
    }
}

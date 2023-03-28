export const createSetStateAction = (state: anyObject) : Action => {
    return {
        type: 'set',
        payload: state,
    }
}

export const createInvalidEmailAction = () : Action => {
    return {
        type: 'invalidEmail',
        payload: null,
    }
}

export const createOccupiedEmailAction = () : Action => {
    return {
        type: 'occupiedEmail',
        payload: null,
    }
}

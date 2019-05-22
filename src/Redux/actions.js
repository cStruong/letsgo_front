export const logIn = (userObj) => {
    return {
        type: "LOG_IN", 
        payload: userObj 
    }
}

export const createTrip = (parsedNewUserTrip) => {
    return {
        type: "CREATE_TRIP",
        payload: parsedNewUserTrip
    }
}

export const setTripState = (selectedTripObj) => {
    return {
        type: "SET_TRIPSTATE",
        payload: selectedTripObj
    }
}

export const removeUserTrip = (id) => {
    return {
        type: "REMOVE_USERTRIP",
        payload: id
    }
}
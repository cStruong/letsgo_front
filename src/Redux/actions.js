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
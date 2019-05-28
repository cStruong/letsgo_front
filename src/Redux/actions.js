export const logIn = (userObj) => {
    return {
        type: "LOG_IN", 
        payload: userObj 
    }
}

export const logOut = () => {
    return {
        type:"LOG_OUT"
    }
}

export const changeName = (nameObj) => {
    return {
        type: 'CHANGE_NAME',
        payload: nameObj.first_name,
        payload2: nameObj.last_name
    }
}

export const createTrip = (parsedNewUserTrip) => {
    return {
        type: "CREATE_TRIP",
        payload: parsedNewUserTrip
    }
}

export const deleteTrip = (id) => {
    return {
        type: "DELETE_TRIP",
        payload: id
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

export const addMemberToTrip = (returnedUserObj) => {
    return {
        type: "ADD_MEMBER",
        payload: returnedUserObj[0],
        payload2: returnedUserObj[1]
    }
}

export const removeMemberFromTrip = (id, usertripid) => {
    return {
        type: "REMOVE_MEMBER",
        payload: id,
        payload2: usertripid
    }
}

export const updateContribution = (usertripObj) => {
    return {
        type: "UPDATE_CONTRIBUTION",
        payload: usertripObj
    }
}

export const createItineraryItem = (newItineraryItemObj) => {
    return {
        type: "CREATE_ITINERARYITEM",
        payload: newItineraryItemObj
    }
}

export const deleteItineraryItem = (id) => {
    return {
        type: "DELETE_ITINERARYITEM",
        payload: id
    }
}
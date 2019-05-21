const initialState = {
    currentUser: {},
    currentTrip: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case "LOG_IN":
             return {...state, 
                currentUser: action.payload
             }

        case "CREATE_TRIP":
             const currentStateUser = state.currentUser
             return {...state,
                currentUser: {...currentStateUser,
                    user_trips: [...currentStateUser.user_trips, action.payload]
                }
             }

        case "SET_TRIPSTATE":
             return {...state,
                currentTrip: action.payload
             }

        case "REMOVE_USERTRIP":
             let newUserTripArr = [...state.currentUser.user_trips]
             newUserTripArr = newUserTripArr.filter(userTrip => 
                userTrip.id !== action.payload
                )
             return {...state,
                currentUser: {...state.currentUser,
                    user_trips: newUserTripArr
                }
             }

        default:
            return state
    }
}

export default reducer; 
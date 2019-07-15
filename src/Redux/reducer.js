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

        case "LOG_OUT":
             return initialState

        case "CHANGE_NAME":
            return {...state,
                currentUser: {...state.currentUser,
                    first_name: action.payload,
                    last_name: action.payload2
                }
            }

        case "CHANGE_AVATAR":
            return {...state,
                currentUser: {...state.currentUser,
                    profile_picture: action.payload,
                }
            }

        case "CREATE_TRIP":
             const currentStateUser = state.currentUser
             return {...state,
                currentUser: {...currentStateUser,
                    user_trips: [...currentStateUser.user_trips, action.payload]
                }
             }

        case "DELETE_TRIP":
            let newTripArr = [...state.currentUser.user_trips]
            newTripArr = newTripArr.filter(usertrip => 
                    usertrip.trip.id !== action.payload
                )
            return {...state,
                currentUser: {...state.currentUser,
                    user_trips: newTripArr
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

        case "ADD_MEMBER":
             let newUserListArr = [...state.currentTrip.users, action.payload]
             let addUserTripArr = [...state.currentTrip.user_trips, action.payload2]

             return {...state,
                currentTrip: {...state.currentTrip, 
                    users: newUserListArr,
                    user_trips: addUserTripArr
                }
             }

        case "REMOVE_MEMBER": 
            let newCurrentMembersArr = [...state.currentTrip.users]
            newCurrentMembersArr = newCurrentMembersArr.filter(user => 
                user.id !== action.payload
                )

            let newUserTripArray = [...state.currentTrip.user_trips]
            newUserTripArray = newUserTripArray.filter(usertrip => 
                    usertrip.id !== action.payload2
                )
            return {...state,
                currentTrip: {...state.currentTrip,
                    user_trips: newUserTripArray,
                    users: newCurrentMembersArr
                }
            }

        case "UPDATE_CONTRIBUTION":
            let newUserTripContributionArr = [...state.currentTrip.user_trips]
            newUserTripContributionArr = newUserTripContributionArr.filter(usertrip => 
                usertrip.id !== action.payload.id
                )

            return {...state,
                currentTrip: {...state.currentTrip,
                    user_trips: [...newUserTripContributionArr, action.payload]
                }
            }

        case "CREATE_EXPENSEITEM":
             const currentStateTrip = state.currentTrip
             return {...state,
                currentTrip: {...currentStateTrip, 
                    expense_items: [action.payload,...currentStateTrip.expense_items]
                }
            }

        case "DELETE_EXPENSEITEM":
            let currentStateExpenseItems = [...state.currentTrip.expense_items]
            currentStateExpenseItems = currentStateExpenseItems.filter(expense_item =>
                    expense_item.id !== action.payload
                )
            return {...state,
                currentTrip: {...state.currentTrip,
                    expense_items: currentStateExpenseItems
                }
            }
            
        case "FLIP_EXPENSEITEMPAIDSTATUS":
            let currentStateExpenseItemStatus = [...state.currentTrip.expense_items]
            currentStateExpenseItemStatus = currentStateExpenseItemStatus.filter(expense_item =>
                    expense_item.id !== action.payload
                )
            return {...state,
                currentTrip: {...state.currentTrip,
                    expense_items: [...currentStateExpenseItemStatus, action.payload2]
                }
            }

        case "CREATE_ITINERARYITEM":
                const currentStateTripItinerary = state.currentTrip
                return {...state,
                currentTrip: {...currentStateTripItinerary, 
                    itinerary_items: [action.payload,...currentStateTripItinerary.itinerary_items]
                }
            }
        
        case "DELETE_ITINERARYITEM":
                let currentStateItineraryItems = [...state.currentTrip.itinerary_items]
                currentStateItineraryItems = currentStateItineraryItems.filter(itinerary_item =>
                        itinerary_item.id !== action.payload
                    )
                return {...state,
                    currentTrip: {...state.currentTrip,
                        itinerary_items: currentStateItineraryItems
                    }
            }

        default:
            return state
    }
}

export default reducer; 
import React from 'react'
import TripCard from './TripCard'

const TripList = (props) => {
    return (
        <div className="triplist">
            {props.currentUser.user_trips.map(userTrips => 
                <TripCard userTripObj={userTrips} trips={props.currentUser.trips}/>
            )}
        </div>
    )
}

export default TripList
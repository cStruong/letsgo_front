import React from 'react'
import TripCard from './TripCard'

const TripList = (props) => {
    return (
        <div className="triplist">
            <div className="triplistinner">
            {props.currentUser.user_trips.map(userTrips => 
                <TripCard userTripObj={userTrips} />
            )}
            </div>
        </div>
    )
}

export default TripList
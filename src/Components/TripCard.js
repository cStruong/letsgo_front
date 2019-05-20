import React from 'react'

const TripCard = (props) => {
    
    let currentTrip = props.trips.filter(trip => 
        trip.id === props.userTripObj.trip_id)

    return (
        <div>
            Destination: {currentTrip[0].destination}
            <br></br>
            Date: {currentTrip[0].date}
            <br></br>
            Total: {props.userTripObj.total_balance}
        </div>
    )
}

export default TripCard;
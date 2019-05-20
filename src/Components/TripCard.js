import React from 'react'

const TripCard = (props) => {
    return (
        <div className="tripcard" >
                Destination: {props.userTripObj.trip.destination}
                <br></br>
                Date: {props.userTripObj.trip.date}
                <br></br>
                Total: {props.userTripObj.total_balance}
        </div>
    )
}

export default TripCard;
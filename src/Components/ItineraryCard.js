import React from 'react'

const ItineraryCard = (props) => {
    return(
        <div className="itinerarycard">
            Itinerary Card
            <br></br>
            {props.itinerary_itemObj.name}
            <br></br>
            {props.itinerary_itemObj.estimated_cost}
        </div>
    )
}

export default ItineraryCard
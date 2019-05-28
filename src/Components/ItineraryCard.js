import React from 'react'

import { connect } from 'react-redux'
import { deleteItineraryItem } from '../Redux/actions.js';

const ItineraryCard = (props) => {

     let handleDelete = (event) => {
         let id = props.itinerary_itemObj.id
        fetch(`http://localhost:3005/itineraryitems/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            props.deleteItineraryItem(id);
        })
    }

    return(
        <div className="itinerarycard">
            <button style={{ float: "right"}} onClick={handleDelete}>❌</button>
            Itinerary Card
            <br></br>
            {props.itinerary_itemObj.name}
            <br></br>
            {props.itinerary_itemObj.estimated_cost}
        </div>
    )
}

export default connect(null, { deleteItineraryItem })(ItineraryCard)
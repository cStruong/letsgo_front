import React from 'react'

import { connect } from 'react-redux';

import { deleteItineraryItem } from '../Redux/actions.js';



class ItineraryCard extends React.Component {
    state = {
        editformshow: false
    }

    handleDelete = (event) => {
        let id = this.props.itinerary_itemObj.id
        fetch(`http://localhost:3005/itineraryitems/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.deleteItineraryItem(id);
        })
    }

    render () {
    return(
        <div className="itineraryCard">
            ⋆ {this.props.itinerary_itemObj.name}
            {this.props.editButtonState ? <div className="itineraryCardBtnContainer"> <button style={ {fontSize: "0.6vw", borderColor: "transparent", float: "right", textAlign: "right"} } onClick={this.handleDelete}>❌</button> <button style={ {fontSize: "0.6vw", borderColor: "transparent", float: "right", textAlign: "center", marginRight: "1%"} } onClick={this.handleDelete}>🔗</button> </div>: null}
        </div>
    )
  }
}

export default connect(null, { deleteItineraryItem })(ItineraryCard)
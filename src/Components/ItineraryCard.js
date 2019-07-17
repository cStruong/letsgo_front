import React from 'react'

import { connect } from 'react-redux';

import { deleteItineraryItem } from '../Redux/actions.js';
import EditItineraryCardForm from '../Components/EditItineraryCardForm.js';



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

    handleToggle = (event) => {
        this.setState({
            editformshow: !this.state.editformshow
        })
    }

    handleEdit = (event) => {

    }

    render () {

    let linkedName = <a href={this.props.itinerary_itemObj.link} target="_blank"> {this.props.itinerary_itemObj.name} </a>;
    let unlinkedName = this.props.itinerary_itemObj.name

    return(
        <div className="itineraryCard">
            ⋆ {!(this.props.itinerary_itemObj.link) ? unlinkedName : linkedName}
            {this.props.editButtonState ? <div className="itineraryCardBtnContainer"> <button style={ {fontSize: "0.6vw", borderColor: "transparent", float: "right", textAlign: "right"} } onClick={this.handleDelete}>❌</button> <button style={ {fontSize: "0.6vw", borderColor: "transparent", float: "right", textAlign: "center", marginRight: "1%"} } onClick={this.handleToggle}>🔗</button> </div>: null}
            {this.state.editformshow ? <EditItineraryCardForm handleToggle={this.handleToggle} itinerary_itemObj={this.props.itinerary_itemObj}/> : null}
        </div>
    )
  }
}

export default connect(null, { deleteItineraryItem })(ItineraryCard)
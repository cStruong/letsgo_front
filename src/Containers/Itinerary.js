import React from 'react'

import ItineraryCard from '../Components/ItineraryCard.js'
import AddItineraryItemForm from '../Components/AddItineraryItemForm.js'

class Itinerary extends React.Component {

    state = {
        addformshow: false,
        editButtonState: false,
    }

    handleToggle = (event) => {
        this.setState({
            addformshow: !this.state.addformshow
        })
    }

    handleEditToggle = (event) => {
        this.setState({
            editButtonState: !this.state.editButtonState
        })
    }

    render() {

        return (
            <div className="itineraryCont">
                 <h1 className="itineraryheader">Itinerary</h1>
                 <button className="itineraryEditBtn" onClick={this.handleEditToggle} style={ {color: "#3bd80c", float: "right", marginRight: "2%"} }> ✏️ </button>
                 <button className="itineraryAddBtn" onClick={this.handleToggle} style={ {color: "#3bd80c", float: "right"} }> + </button>
                 {this.state.addformshow ? <AddItineraryItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  
                 <div className="itineraryCardContainer">
                     {this.props.tripObj.itinerary_items.map(itinerary_item =>
                        <ItineraryCard itinerary_itemObj={itinerary_item} editButtonState={this.state.editButtonState} />
                     )}
                 </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         currentUser: state.currentUser,
//         currentTrip: state.currentTrip
//     }
// }

export default Itinerary
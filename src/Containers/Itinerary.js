import React from 'react'

import ItineraryCard from '../Components/ItineraryCard.js'
import NewItineraryItemForm from '../Components/NewItineraryItemForm.js'

class Itinerary extends React.Component {

    state = {
        editformshow: false
    }

    handleToggle = (event) => {
        this.setState({
            editformshow: !this.state.editformshow
        })
    }

    render() {
        return (
            <div className="itineraryCont">
            <button onClick={this.handleToggle}> ➕</button>
            {this.state.editformshow ? <NewItineraryItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  

                {this.props.tripObj.itinerary_items.map(itinerary_item => 
                    <ItineraryCard itinerary_itemObj={itinerary_item} />
                    )}
            </div>
        )
    }
}

export default Itinerary
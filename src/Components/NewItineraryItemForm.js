import React from 'react'

import { connect } from 'react-redux'
import { createItineraryItem } from '../Redux/actions.js'

class NewItineraryItemForm extends React.Component {

    state = {
        name: "",
        estimated_cost: null
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    newItineraryItemSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/itineraryitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                estimated_cost: this.state.estimated_cost,
                trip_id: this.props.tripObj.id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(newItineraryItemObj => {
            this.props.createItineraryItem(newItineraryItemObj)
        })

    }

    render() {
        return (
            <div className="itineraryItemForm">
                <form onSubmit={(event) => {this.newItineraryItemSubmit(event); this.props.handleToggle();}}>
                    <input onChange={this.changeHandler} type='textfield' placeholder="Item Name" name="name" value={this.state.name}/>
                    <br></br>
                    <input onChange={this.changeHandler} type='numberfield' placeholder="Estimated Cost" name="estimated_cost" value={this.state.estimated_cost}/>
                    <br></br>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createItineraryItem })(NewItineraryItemForm)
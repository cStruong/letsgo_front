import React from 'react'
import { connect } from 'react-redux'

import { editItineraryCard } from '../Redux/actions.js'

class EditItineraryCardForm extends React.Component{

    state = {
        name: this.props.itinerary_itemObj.name,
        link: this.props.itinerary_itemObj.link
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    editItineraryCard = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3005/itineraryitems/${this.props.itinerary_itemObj.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                link: this.state.link
            })
        })
        .then(response => {
            return response.json();
        })
        .then(parsedNewItineraryCardObj => {
            this.props.editItineraryCard(parsedNewItineraryCardObj)
        })
    }

    render() {
        return(
            <div className="expenseItemForm">
                <form onSubmit={(event) => {this.editItineraryCard(event); this.props.handleToggle();}}>
                    <label>Activity: </label>
                    <input onChange={this.changeHandler} type='textfield' placeholder="(e.g. Airplane Tickets, Hotel" name="name" value={this.state.name}/>
                    <br></br>
                    <label>Link to Activity(Optional):</label>
                    <input onChange={this.changeHandler} type='textfield' placeholder="http://www.google.com" name="link" value={this.state.link}/>
                    <br></br>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { editItineraryCard })(EditItineraryCardForm)
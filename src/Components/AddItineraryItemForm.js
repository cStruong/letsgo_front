import React from 'react'

import { connect } from 'react-redux'
import { createItineraryItem } from '../Redux/actions.js'

class AddItineraryItemForm extends React.Component {

    state = {
        activity: "",
        link: ""
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
                name: this.state.activity,
                link: this.state.link, 
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
                    <label>Activity: </label>
                    <input onChange={this.changeHandler} type='textfield' placeholder="(e.g. Hiking, Exploring" name="activity" value={this.state.activity}/>
                    <br></br>
                    <label>Link to Activity(Optional):</label>
                    <input onChange={this.changeHandler} type='textfield' placeholder="http://www.google.com" name="link" value={this.state.link}/>
                    <br></br>
                    <br></br>
                    <button type='submit'>Submit</button>
                    <button onClick={this.props.handleToggle}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createItineraryItem })(AddItineraryItemForm)
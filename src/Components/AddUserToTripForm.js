import React from 'react'

import { connect } from 'react-redux'
import { addMemberToTrip } from '../Redux/actions.js'
class AddUserToTripForm extends React.Component {

    state = {
        email: ""
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddMemberSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/users/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
                trip_id: this.props.tripObj.id
            })
        })
        .then(response => {
            return response.json()
        })
        .then(returnedUserObj => {
            if (returnedUserObj.id !== undefined) {
            this.props.addMemberToTrip(returnedUserObj)
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => {this.handleAddMemberSubmit(event); this.props.handleToggle()}}>
                    <input onChange={this.changeHandler} type="textfield" placeholder="Enter Email" name="email" value={this.state.email}/>
                    <button type="submit">Add Member</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addMemberToTrip })(AddUserToTripForm)
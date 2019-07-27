import React from 'react'

import { connect } from 'react-redux'
import { addMemberToTrip } from '../Redux/actions.js'
import FormError from '../Containers/FormError.js'
class AddUserToTripForm extends React.Component {

    state = {
        email: "",
        errorshow: false,
        error: {}
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
            if (!returnedUserObj.length === false) {
            this.props.addMemberToTrip(returnedUserObj)
            this.props.handleToggle();
            } else {
                this.setState({
                    errorshow: true,
                    error: returnedUserObj.error
                })
            }
        })
    }

    render() {
        return (
            <div style={{float:"left", position: "relative"}}>
            {this.state.errorshow ? <FormError error={this.state.error} /> : null}
                <form onSubmit={(event) => this.handleAddMemberSubmit(event)}>
                    <input onChange={this.changeHandler} type="textfield" placeholder="Enter Email" name="email" value={this.state.email}/>
                    <button type="submit">Add Member</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addMemberToTrip })(AddUserToTripForm)
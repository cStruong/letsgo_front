import React from 'react'
import { connect } from 'react-redux'

import { updateContribution } from '../Redux/actions.js'

class EditContributionForm extends React.Component{

    state = {
        contribution: this.props.contribution
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    editContribution = (event) => {
        event.preventDefault();
        this.props.toggleSetContribution()
        let currentUserTrip = this.props.currentUserTrip[0]
        console.log(this.state.contribution)
        fetch(`http://localhost:3005/usertrips/${currentUserTrip.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                paid: this.state.contribution
            })
        })
        .then(response => {
            return response.json();
        })
        .then(parsedUserTripObj => {
            console.log(parsedUserTripObj)
            this.props.updateContribution(parsedUserTripObj)
        })
    }

    render() {
        return(
            <div style={ {position: "relative", float: "left"} }>
                <form onSubmit={this.editContribution}>
                    <input onChange={this.changeHandler} name="contribution" value={this.state.contribution} type="numberfield" placeholder={this.props.contribution} />
                    <button style={ {backgroundColor: "transparent", borderColor: "transparent"} } type="submit">✅</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { updateContribution })(EditContributionForm)
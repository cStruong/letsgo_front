import React from 'react'

import { connect } from 'react-redux'
import { changeName } from '../Redux/actions.js'

class NameForm extends React.Component{

    state = {
        firstname: this.props.currentUser.first_name,
        lastname: this.props.currentUser.last_name
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let currentId = this.props.currentUser.id
        this.props.toggleNameEdit();
        fetch(`http://localhost:3005/users/${currentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.firstname,
                last_name: this.state.lastname
            })
        })
        .then(response => {
            return response.json()
        })
        .then(parsedName => {
            this.props.changeName(parsedName)
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input required onChange={this.handleChange} value={this.state.firstname} placeholder={this.props.currentUser.first_name} type="textfield" name="firstname"/>
                    <input required onChange={this.handleChange} value={this.state.lastname} placeholder={this.props.currentUser.last_name} type="textfield" name="lastname" style={ {marginLeft: "8px"} }/> 
                    <button style={ {backgroundColor: "transparent", borderColor: "transparent"} } type="submit">✅</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps, { changeName })(NameForm)
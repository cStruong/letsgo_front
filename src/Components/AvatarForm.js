import React from 'react'

import { connect } from 'react-redux'
import { changeAvatar } from '../Redux/actions.js'

class AvatarForm extends React.Component{

    state = {
        avatarUrl: this.props.currentUser.profile_picture
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let currentId = this.props.currentUser.id
        this.props.toggleAvatarEdit();
        fetch(`http://localhost:3005/users/${currentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.props.currentUser.first_name,
                last_name: this.props.currentUser.last_name,
                profile_picture: this.state.avatarUrl
            })
        })
        .then(response => {
            return response.json()
        })
        .then(parsedAvatar => {
            this.props.changeAvatar(parsedAvatar)
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
                    <input onChange={this.handleChange} value={this.state.avatarUrl} placeholder="Paste Image URL here" type="textfield" name="avatarUrl"/>
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

export default connect(mapStateToProps, { changeAvatar })(AvatarForm)
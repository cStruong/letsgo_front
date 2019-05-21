import React from 'react';

import NewTripForm from '../Components/NewTripForm.js'
import TripList from '../Components/TripList.js'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'


class User extends React.Component {

    render() {
        if (!localStorage.getItem("token") || localStorage.getItem("token") === 'undefined') {
            return (
                <div>
                    Please Log in first. Redirecting to Log in Page.
                    {this.props.history.push('/')}
                </div>
            )
        } else if (this.props.currentUser === undefined || this.props.currentUser.id === undefined) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {   
            return (
                <div>
                    <h1>{this.props.currentUser.first_name}</h1>
                    <NewTripForm />
                    <TripList currentUser={this.props.currentUser} />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps)(withRouter(User))
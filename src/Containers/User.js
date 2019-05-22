import React from 'react';

import NewTripForm from '../Components/NewTripForm.js'
import TripList from '../Components/TripList.js'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logOut } from '../Redux/actions'

class User extends React.Component {

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logOut();
        this.props.history.push('/')

    }

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
                    <button onClick={this.handleLogout}>Log Out</button>
                    <br></br>
                    <br></br>
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

export default connect(mapStateToProps, { logOut })(withRouter(User))
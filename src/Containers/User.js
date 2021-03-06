import React from 'react';

import NewTripForm from '../Components/NewTripForm.js'
import TripList from '../Components/TripList.js'
import { Link, withRouter } from 'react-router-dom';
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
                    <br></br>
                    or <Link to="/user">Return to Profile</Link>
                    <br></br>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            )
        } else {   
            return (
                <div className="userprofilepage">
                {/* Photo by Kyle Glenn on Unsplash */}
                    <button className="logoutBtn" onClick={this.handleLogout}>🚪 Log Out</button>
                    <br></br>
                    <br></br>
                    <NewTripForm />
                    <div className="tripsheader">
                        <h1> {this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name}'S TRIPS</h1>
                    </div>
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
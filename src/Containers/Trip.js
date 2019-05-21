import React from 'react'
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom';
import { setTripState, removeUserTrip } from '../Redux/actions.js'
import MemberList from '../Components/MemberList.js'

class Trip extends React.Component {

    componentDidMount() {
        fetch(`http://localhost:3005/trips/${this.props.match.params.id}`)
            .then(response => {
                return response.json()
            })
            .then(parsedTripObj => {
                this.props.setTripState(parsedTripObj);
            })
    }
    
    handleDelete = (event) => {
        let currentUserTripArr = this.props.currentTrip.user_trips.filter(user_trip => 
            user_trip.user_id === this.props.currentUser.id
        )

        let currentUserTripID = currentUserTripArr[0].id

        fetch(`http://localhost:3005/usertrips/${currentUserTripID}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.removeUserTrip(currentUserTripID)
            this.props.history.push('/user')
        })
    }

    render() {

        if (!localStorage.getItem("token") || localStorage.getItem("token") === 'undefined') {
            return (
                <div>
                    Please Log in first. Redirecting to Log in Page.
                    {this.props.history.push('/')}
                </div>
            )
        } else if ((this.props.currentTrip.users !== undefined)) {
            if (this.props.currentTrip.users.includes(this.props.currentUser)) {
                return (
                    <div>
                        <h1>{this.props.currentTrip.destination} on {this.props.currentTrip.date} </h1>
                        <button onClick={this.handleDelete}>Leave Trip</button>
                        <MemberList tripObj={this.props.currentTrip}/>
                    </div>
                )
            } else {
                return (
                    <React.Fragment>
                        You do not have access to this page. Redirecting...
                        {this.props.history.push('/user')}
                    </React.Fragment>
                )
            }
        } else {
            return (
                <div>
                    Loading...
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

export default connect(mapStateToProps, { setTripState, removeUserTrip } )(withRouter(Trip))
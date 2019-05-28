import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import { setTripState, removeUserTrip, deleteTrip } from '../Redux/actions.js'

import MemberList from '../Components/MemberList.js'
import AdminMemberList from '../Components/AdminMemberList.js'
import Itinerary from './Itinerary.js'
import MessageBoard from './MessageBoard.js'
import Yelp from './Yelp.js'

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

    handleTripDelete = () => {
        let currentTripId = this.props.currentTrip.id
        fetch(`http://localhost:3005/trips/${currentTripId}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.deleteTrip(currentTripId)
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

            let userChecker = (id) => {

                for (let i = 0; i < this.props.currentTrip.users.length; i++) {
                    if (this.props.currentTrip.users[i].id === id) {
                        return true;
                    }
                }

                return false;
            }

             if (userChecker(this.props.currentUser.id)) {
                    if (this.props.currentTrip.admin_id === this.props.currentUser.id) {
                        return (
                            <div className="tripmain">
                                <div>
                                <h1>{this.props.currentTrip.destination} on {this.props.currentTrip.date} </h1>
                                <button onClick={this.handleTripDelete} style={ {float: "right"} }>Delete Trip</button>
                                </div>
                                <AdminMemberList tripObj={this.props.currentTrip}/>
                                <Itinerary tripObj={this.props.currentTrip} />
                                <MessageBoard />
                                <Yelp />
                            </div>
                        )
                    } else {
                    return (
                            <div className="tripmain">
                                <h1>{this.props.currentTrip.destination} on {this.props.currentTrip.date} </h1>
                                <button onClick={this.handleDelete}>Leave Trip</button>
                                <MemberList tripObj={this.props.currentTrip}/>
                                <Itinerary tripObj={this.props.currentTrip} />
                                <MessageBoard />
                                <Yelp />
                            </div>
                        )
                    }
            } else if (userChecker(this.props.currentUser.id) === false) {
                return (
                    <React.Fragment>
                        You do not have access to this page.
                        <br></br>
                        <Link to="/user">Your Profile</Link>
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

export default connect(mapStateToProps, { setTripState, removeUserTrip, deleteTrip } )(withRouter(Trip))
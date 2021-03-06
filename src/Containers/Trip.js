import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import { setTripState, removeUserTrip, deleteTrip, logOut } from '../Redux/actions.js'

import MemberList from '../Components/MemberList.js'
import AdminMemberList from '../Components/AdminMemberList.js'
import AdminExpense from './AdminExpense.js'
import Expense from './Expense.js'
import Yelp from './Yelp.js'
import Itinerary from './Itinerary.js'

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

    handleLogout = () => {
        localStorage.removeItem('token')
        this.props.logOut();
        this.props.history.push('/')
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

    returnToProfile = () => {
        this.props.history.push('/user')
    }

    render() {

        if (!localStorage.getItem("token") || localStorage.getItem("token") === 'undefined') {
            return (
                <div>
                    Please Log in first. Redirecting to <Link to="/">Log in</Link> Page.<br></br>
                    or <button onClick={this.handleLogout}>Logout</button>
                    {this.props.history.push('/')}
                </div>
            )
        } else if (!this.props.currentTrip === true) {
            return (
            <React.Fragment>
            You do not have access to this page.
            <br></br>
            <Link to="/user">Your Profile</Link>
            <br></br>
            or
            <button onClick={this.handleLogout}>Logout</button>
            </React.Fragment>
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
                                <div className="tripHeader">
                                <button className="tripHeaderBtn" onClick={this.returnToProfile} style={ {float: "left"} }>⃪ Back to all Trips</button>
                                <button className="tripHeaderBtn" onClick={this.handleTripDelete} style={ {float: "right"} }>💣 Delete Trip</button>
                                </div>
                                <AdminMemberList tripObj={this.props.currentTrip}/>
                                <div className="extras">
                                    <div className="expensedash">
                                        <h1 className="expensedashheader">Expenses</h1>
                                        <AdminExpense tripObj={this.props.currentTrip} />
                                    </div>
                                    
                                    <Itinerary tripObj={this.props.currentTrip}/>
                                    <Yelp />
                                </div>
                            </div>
                        )
                    } else {
                    return (
                            <div className="tripmain">
                                <div className="tripHeader">
                                <button className="tripHeaderBtn" onClick={this.returnToProfile} style={ {float: "left"} }>⃪ Back to all Trips</button>
                                <button className="tripHeaderBtn" onClick={this.handleDelete} style={ {float: "right"} }>Leave Trip</button>
                                </div>
                                <MemberList tripObj={this.props.currentTrip}/>
                                <div className="extras">
                                    <div className="expensedash">
                                    <h1 className="expensedashheader">Expenses</h1>
                                    <Expense tripObj={this.props.currentTrip} />
                                    </div>
                                    <Itinerary tripObj={this.props.currentTrip} />
                                    <Yelp />
                                </div>
                            </div>
                        )
                    }
            } else if (userChecker(this.props.currentUser.id) === false) {
                return (
                    <React.Fragment>
                        You do not have access to this page.
                        <br></br>
                        <Link to="/user">Your Profile</Link>
                        <br></br>
                        or
                        <button onClick={this.handleLogout}>Logout</button>
                    </React.Fragment>
                )
            }
        } else {
            return (
                <div>
                    Loading...
                    <br></br>
                    or <Link to="/user">Return to Profile.</Link>
                    <br></br>
                    <button onClick={this.handleLogout}>Logout</button>
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

export default connect(mapStateToProps, { setTripState, removeUserTrip, deleteTrip, logOut } )(withRouter(Trip))
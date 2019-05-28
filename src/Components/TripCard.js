import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Trip from '../Containers/Trip.js'
import { setTripState } from '../Redux/actions.js'

class TripCard extends React.Component {

    handleClick = (event) => {
        const selectedTripObj = this.props.userTripObj.trip
        this.props.setTripState(selectedTripObj);
        this.props.history.push(`/trip/${selectedTripObj.id}`)
    }

    defaultPic = require("../assets/defaultTripcardbg.jpg")
    photo = this.props.userTripObj.trip.picture_url !== "" ? this.props.userTripObj.trip.picture_url : this.defaultPic


    render() {
        return (
        <div className='photocard'>
            <div style={ {backgroundImage: `url(${this.photo})`} } onClick={this.handleClick} className="tripcard" >
                    Destination: {this.props.userTripObj.trip.destination}
                    <br></br>
                    Date: {this.props.userTripObj.trip.date}
                    <br></br>
                    Contributed: {this.props.userTripObj.paid}
            </div>
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

export default connect(mapStateToProps, { setTripState })(withRouter(TripCard))
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import Trip from '../Containers/Trip.js'
import { setTripState } from '../Redux/actions.js'

class TripCard extends React.Component {

    handleClick = (event) => {
        const selectedTripObj = this.props.userTripObj.trip
        this.props.setTripState(selectedTripObj);
        this.props.history.push('/trip')
    }

    render() {
        return (
            <div onClick={this.handleClick} className="tripcard" >
                    Destination: {this.props.userTripObj.trip.destination}
                    <br></br>
                    Date: {this.props.userTripObj.trip.date}
                    <br></br>
                    Total: {this.props.userTripObj.total_balance}
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
import React from 'react'
import { connect } from 'react-redux'

import MemberList from '../Components/MemberList.js'

class Trip extends React.Component {
    render() {
        if (!this.props.currentTrip ||  this.props.currentTrip.id === undefined) {
            return (
                <div>
                    lost store...
                </div>
            )
        } else {
        return (
            <div>
                <h1>{this.props.currentTrip.destination} on {this.props.currentTrip.date} </h1>
                <MemberList />
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

export default connect(mapStateToProps)(Trip)
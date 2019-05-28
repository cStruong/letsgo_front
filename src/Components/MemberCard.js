import React from 'react'

import { connect } from 'react-redux'

const MemberCard = (props) => {
    let currentUserTrip = props.tripObj.user_trips.filter(usertrip => 
            usertrip.user_id === props.userObj.id
        )

    return(
        <div className="membercard">
            {props.userObj.first_name} {props.userObj.last_name}
            <br></br>
            Contributed: {currentUserTrip[0].paid}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps)(MemberCard)
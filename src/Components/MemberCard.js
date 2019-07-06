import React from 'react'

import { connect } from 'react-redux'

const MemberCard = (props) => {
    let currentUserTrip = props.tripObj.user_trips.filter(usertrip => 
            usertrip.user_id === props.userObj.id
        )

    let avatar = props.userObj.profile_picture;

    return(
        <div className="membercard">
            <div className="membercardheader">
            {props.userObj.first_name} {props.userObj.last_name}
            </div>
            <div className = "avatarCircle" style={ {backgroundImage: `url(${avatar})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
            </div>
            <p className="membercardcontent">
            <br></br>
            Contributed: ${currentUserTrip[0].paid}
            </p>
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
import React from 'react'

const MemberCard = (props) => {
    return(
        <div className="membercard">
            {props.userObj.first_name} {props.userObj.last_name}
        </div>
    )
}

export default MemberCard
import React from 'react'

import MemberCard from './MemberCard'

const MemberList = (props) => {
    return (
        <div className="memberlist">
            {props.tripObj.users.map(user => 
            <MemberCard userObj={user} />
            )}
        </div>
    )
}

export default MemberList
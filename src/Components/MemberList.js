import React from 'react'

import MemberCard from './MemberCard'
import ExpenseTotals from '../Components/ExpenseTotals.js';

const MemberList = (props) => {
    return (
        <div>
            <div className="memberlist">
                {props.tripObj.users.map(user => 
                <MemberCard userObj={user} tripObj={props.tripObj}/>
                )}
            </div>
            <div>
                <ExpenseTotals />
            </div>
        </div>
    )
}

export default MemberList
import React from 'react'

import { connect } from 'react-redux'

import MemberCard from './MemberCard'
import ExpenseTotals from '../Components/ExpenseTotals.js';

const MemberList = (props) => {
    return (
        <div className="memberexpensecontain">
            <h1 className="memberlisth1" style={ {textAlign: "center"} }>{props.currentTrip.destination} on {props.currentTrip.date} </h1>
            <div className="memberlist">
                {props.tripObj.users.map(user => 
                <MemberCard userObj={user} tripObj={props.tripObj}/>
                )}
            </div>
            <div className="expensedash">
                <ExpenseTotals />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps)(MemberList)
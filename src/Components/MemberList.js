import React from 'react'

import { connect } from 'react-redux'

import MemberCard from './MemberCard'
import ExpenseTotals from '../Components/ExpenseTotals.js';

const MemberList = (props) => {

    let date = props.currentTrip.date;
    let dateArr = date.split('-');
    let formatDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0]

    return (
        <div className="memberexpensecontain">
            <h1 className="memberlisth1" style={ {textAlign: "center"} }> You're going to {props.currentTrip.destination} on {formatDate}!</h1>
            <div className="memberlist">
                {props.tripObj.users.map(user => 
                <MemberCard userObj={user} tripObj={props.tripObj}/>
                )}
            </div>
                <ExpenseTotals />
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
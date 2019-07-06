import React from 'react'

import { connect } from 'react-redux'

import AdminMemberCard from './AdminMemberCard.js'
import ExpenseTotals from './ExpenseTotals.js'
import AddUserToTripForm from './AddUserToTripForm.js'

class AdminMemberList extends React.Component {

    state = {
        addMemberToggle: false
    }

    handleToggle = () => {
        this.setState({
            addMemberToggle: !this.state.addMemberToggle
        })
    }

    render() {
        let date = this.props.currentTrip.date;
        let dateArr = date.split('-');
        let formatDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0]

        return (
            <div className="memberexpensecontain">
                 <h1 className="memberlisth1" style={ {textAlign: "center"} }> You're going to {this.props.currentTrip.destination} on {formatDate}!</h1>
                <div className="memberlist">
                    <button className="hoverbutton" style={ {position: "relative", float: "left", textAlign: "left"} } onClick={this.handleToggle}>➕👤</button>
                    <br></br>
                    <br></br>
                    {this.state.addMemberToggle ? <AddUserToTripForm handleToggle={this.handleToggle} tripObj={this.props.tripObj}/> : null}
                    {this.props.tripObj.users.map(user =>
                    <AdminMemberCard userObj={user} tripObj={this.props.tripObj}/>
                    )}
                </div>
                    <ExpenseTotals />
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

export default connect(mapStateToProps)(AdminMemberList)
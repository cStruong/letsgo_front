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
        return (
            <div className="memberexpensecontain">
                 <h1 className="memberlisth1" style={ {textAlign: "center"} }>{this.props.currentTrip.destination} on {this.props.currentTrip.date} </h1>
                <div className="memberlist">
                    <button className="hoverbutton" style={ {float: "left", marginTop: "1%"} } onClick={this.handleToggle}>➕👤</button>
                    <br></br>
                    <br></br>
                    {this.state.addMemberToggle ? <AddUserToTripForm handleToggle={this.handleToggle} tripObj={this.props.tripObj}/> : null}
                    {this.props.tripObj.users.map(user =>
                    <AdminMemberCard userObj={user} tripObj={this.props.tripObj}/>
                    )}
                </div>
                <div className="expensedash">
                    <ExpenseTotals />
                </div>
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
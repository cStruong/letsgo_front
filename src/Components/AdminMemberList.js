import React from 'react'

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
            <div>
                <div className="memberlist">
                    <button style={ {float: "left"} } onClick={this.handleToggle}>➕👤</button>
                    <br></br>
                    <br></br>
                    {this.state.addMemberToggle ? <AddUserToTripForm handleToggle={this.handleToggle} tripObj={this.props.tripObj}/> : null}
                    {this.props.tripObj.users.map(user =>
                    <AdminMemberCard userObj={user} tripObj={this.props.tripObj}/>
                    )}
                </div>
                <div>
                    <ExpenseTotals />
                </div>
            </div>
        )
    }
}

export default AdminMemberList
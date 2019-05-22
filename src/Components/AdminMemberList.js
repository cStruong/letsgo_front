import React from 'react'

import MemberCard from './MemberCard'
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
            <div className="memberlist">
                <button onClick={this.handleToggle} style={ {position: "absolute"} }>➕👤</button>
                {this.state.addMemberToggle ? <AddUserToTripForm handleToggle={this.handleToggle} tripObj={this.props.tripObj}/> : null}
                {this.props.tripObj.users.map(user => 
                <MemberCard userObj={user} />
                )}
            </div>
        )
    }
}

export default AdminMemberList
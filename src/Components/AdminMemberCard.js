import React from 'react'

import { connect } from 'react-redux'

import { removeMemberFromTrip } from '../Redux/actions.js'
import EditContributionForm from './EditContributionForm.js'

class AdminMemberCard extends React.Component{

    state = {
        toggleContributionForm: false
    }

    handleClick = (event) => {
        const targetUserId = this.props.userObj.id
        let targetUserTripArr = this.props.currentTrip.user_trips.filter(usertrip => {
            if (!usertrip === false && usertrip.user_id === targetUserId) {
                return usertrip.id
            }
        })

        let targetUserTrip = targetUserTripArr[0].id
        fetch(`http://localhost:3005/usertrips/${targetUserTrip}`, {
            method: 'DELETE'
        })
        .then(() => {
            this.props.removeMemberFromTrip(targetUserId, targetUserTrip);
        })
    }

    toggleSetContribution = (event) => {
        this.setState({
            toggleContributionForm: !this.state.toggleContributionForm
        })
    }

    currentUserTrip = this.props.currentTrip.user_trips.filter(usertrip => 
        usertrip.user_id === this.props.userObj.id
    )
    
    contribution = this.currentUserTrip[0].paid

    render() {

        if (this.props.userObj !== undefined) {
            return(
                <div className="membercard">
                    {this.props.userObj.id !== this.props.currentTrip.admin_id ? <button onClick={this.handleClick} style={ {float: "right"} }>❌👤</button> : null}
                    {this.props.userObj.first_name} {this.props.userObj.last_name}
                    <br></br>
                    <label style={ {float: "left"} }>Contributed:</label>{this.state.toggleContributionForm ? <EditContributionForm currentUserTrip={this.currentUserTrip} toggleSetContribution={this.toggleSetContribution} contribution={this.contribution}/> : this.contribution}
                    <button onClick={this.toggleSetContribution}>✏️</button>
                </div>
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps, { removeMemberFromTrip })(AdminMemberCard)
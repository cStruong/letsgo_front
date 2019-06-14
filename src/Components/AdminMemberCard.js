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


    retriever = () => {

        let cUTrip = this.props.currentTrip.user_trips.filter(usertrip => 
            usertrip.user_id === this.props.userObj.id
        )

        return cUTrip;
    }


    // oldCurrentUserTrip = this.props.currentTrip.user_trips.filter(usertrip => 
    //     usertrip.user_id === this.props.userObj.id
    // )
    
    // oldContribution = this.oldCurrentUserTrip[0].paid

    render() {

       let currentUserTrip = this.retriever();
       let contribution = currentUserTrip[0].paid

        if (this.props.userObj !== undefined) {
            return(
                <div className="membercard">
                     <p className="membercardcontent">
                    {this.props.userObj.id !== this.props.currentTrip.admin_id ? <button className="hoverbutton" onClick={this.handleClick} style={ {float: "left"} }>❌</button> : null}
                    {this.props.userObj.first_name} {this.props.userObj.last_name}
                    <br></br>
                    <label style={ {float: "left"} }>Contributed: $</label>{this.state.toggleContributionForm ? <EditContributionForm currentUserTrip={currentUserTrip} toggleSetContribution={this.toggleSetContribution} contribution={contribution}/> : contribution}
                    <button className="hoverbutton" onClick={this.toggleSetContribution}>✏️</button>
                    </p>
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
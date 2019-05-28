import React from 'react'

import { connect } from 'react-redux'

class ExpenseTotals extends React.Component {
    render() {
        let totalE = 0;
        this.props.currentTrip.itinerary_items.forEach(itinerary_item => {
            totalE += itinerary_item.estimated_cost
        })
        
        let totalC = 0;
        this.props.currentTrip.user_trips.forEach(user_trip => {
            totalC += user_trip.paid
        })

        return (
            <div className="expensedash">
                Total Expense: {totalE}
                <br></br>
                Total Contributed:  {totalC}
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

export default connect(mapStateToProps)(ExpenseTotals)
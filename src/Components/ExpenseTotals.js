import React from 'react'

import { connect } from 'react-redux'

class ExpenseTotals extends React.Component {
    render() {
        let totalE = 0;
        this.props.currentTrip.expense_items.forEach(expense_item => {
            totalE += expense_item.estimated_cost
        })
        
        let totalC = 0;
        this.props.currentTrip.user_trips.forEach(user_trip => {
            totalC += user_trip.paid
        })

        let percent = Math.floor((totalC / totalE) * 100) 

        if (percent > 100) {
            percent = 100;
        } else if (totalE === 0 && totalC > 0) {
            percent = 100;
        } else if (totalE === 0 && totalC === 0) {
            percent = 0;
        }

        let remaining = totalE - totalC <= 0 ? 0 : (totalE - totalC)

        return (
            <div className="expensenum">
                Total Expense. . . . . . . . . . . ${totalE}
                <br></br>
                Total Contributed. . . . . . . . . . . ${totalC}
                <br></br>
                Total Remaining. . . . . . . . . . . ${remaining}
                <br></br>
                <div className="progressbar">
                    <div className="progressfiller" style={ { width: `${percent}%`} }>{percent}%</div>
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

export default connect(mapStateToProps)(ExpenseTotals)
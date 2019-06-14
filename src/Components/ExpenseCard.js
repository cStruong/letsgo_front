import React from 'react'

import { connect } from 'react-redux'
import { deleteExpenseItem } from '../Redux/actions.js';

const ExpenseCard = (props) => {
        // 14
     let handleDelete = (event) => {
         let id = props.itinerary_itemObj.id
        fetch(`http://localhost:3005/itineraryitems/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            props.deleteExpenseItem(id);
        })
    }

    return(
        <div className="expensecard">
            {/* 15 */}
            <button style={{ float: "left", backgroundColor: "transparent", borderColor: 'transparent'}} onClick={handleDelete}>❌</button>
            {props.itinerary_itemObj.name}
            <br></br>
            {/* 16 */}
            Estimate: $ {props.itinerary_itemObj.estimated_cost}
        </div>
    )
}

export default connect(null, { deleteExpenseItem })(ExpenseCard)
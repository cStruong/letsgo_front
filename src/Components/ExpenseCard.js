import React from 'react'

import { connect } from 'react-redux'
import { deleteExpenseItem } from '../Redux/actions.js';

const ExpenseCard = (props) => {

     let handleDelete = (event) => {
         let id = props.expense_itemObj.id
        fetch(`http://localhost:3005/expenseitems/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            props.deleteExpenseItem(id);
        })
    }

    return(
        <div className="expensecard">
            <div className="expensecardbuttons">
            <button style={{ float: "left", backgroundColor: "transparent", borderColor: 'transparent'}} onClick={handleDelete}>❌</button>
            </div>
            {props.expense_itemObj.name}
            <br></br>
            Estimate: $ {props.expense_itemObj.estimated_cost}
        </div>
    )
}

export default connect(null, { deleteExpenseItem })(ExpenseCard)
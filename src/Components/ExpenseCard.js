import React from 'react'

import { connect } from 'react-redux'
import { deleteExpenseItem, flipExpenseItemPaidStatus } from '../Redux/actions.js';

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

    let handlePaid = (event) => {
        let id = props.expense_itemObj.id
        let paidStatus = props.expense_itemObj.paid
        fetch(`http://localhost:3005/expenseitems/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                paid: !(paidStatus) 
            })
        })
        .then(response =>{
            return response.json();
        })
        .then(parsedPaidResponse => {
            props.flipExpenseItemPaidStatus(parsedPaidResponse.id, parsedPaidResponse)
        })
    }
    

    return(
        <div className="expensecard">
            <div className="expensecardbuttons">
            <button style={{ float: "left", backgroundColor: "transparent", borderColor: 'transparent'}} onClick={handleDelete}>❌</button>
            </div>
            <div className="expensecardinfo">
            {props.expense_itemObj.name}
            <br></br>
            Estimate: $ {props.expense_itemObj.estimated_cost}
            </div>
            <div className="expensecardbuttons">
            <button style={{fontSize: "1.8vw", float: "right", backgroundColor: "transparent", borderColor: 'transparent'}} onClick={handlePaid}>↔️</button>
            </div>
        </div>
    )
}

export default connect(null, { deleteExpenseItem, flipExpenseItemPaidStatus })(ExpenseCard)
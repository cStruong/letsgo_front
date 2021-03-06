import React from 'react'

import ExpenseCard from '../Components/ExpenseCard.js'

import NewExpenseItemForm from '../Components/NewExpenseItemForm.js'

class Expense extends React.Component {

    state = {
        editformshow: false
    }

    handleToggle = (event) => {
        this.setState({
            editformshow: !this.state.editformshow
        })
    }

    render() {

        let unpaid = this.props.tripObj.expense_items.filter(expense_item => 
                expense_item.paid === false
            )

        let paid = this.props.tripObj.expense_items.filter(expense_item => 
            expense_item.paid === true
        )

        return (
            <div style={{height: "100%", width: "100%"}}>
                <div className="expenseCont">
                    <div className="expenseConth3" style={{textAlign: "center"}}>
                    Unpaid
                    </div>
                {this.state.editformshow ? <NewExpenseItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  
                    {unpaid.map(unpaid_expense => 
                        <ExpenseCard expense_itemObj={unpaid_expense} />
                    )}
                </div>
                <div className="expenseCont" style={{float: "right", marginRight: "2%"}}>
                    <div className="expenseConth3" style={{textAlign: "center"}}>
                    Paid
                    </div>
                    {paid.map(paid_expense => 
                        <ExpenseCard expense_itemObj={paid_expense} />
                    )}
                </div>
            </div>
        )
    }
}

export default Expense
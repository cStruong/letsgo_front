import React from 'react'

import AdminExpenseCard from '../Components/AdminExpenseCard.js'

import NewExpenseItemForm from '../Components/NewExpenseItemForm.js'

class AdminExpense extends React.Component {

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
                    Unpaid<button className="expenseAddBtn" onClick={this.handleToggle} style={ {color: "#3bd80c", backgroundColor: "transparent", borderColor: "transparent", float: "right"} }> + </button>
                    </div>
                {this.state.editformshow ? <NewExpenseItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  
                    {unpaid.map(unpaid_expense => 
                        <AdminExpenseCard expense_itemObj={unpaid_expense} />
                    )}
                </div>
                <div className="expenseCont" style={{float: "right", marginRight: "2%"}}>
                    <div className="expenseConth3" style={{textAlign: "center"}}>
                    Paid
                    </div>
                    {paid.map(paid_expense => 
                        <AdminExpenseCard expense_itemObj={paid_expense} />
                    )}
                </div>
            </div>
        )
    }
}

export default AdminExpense
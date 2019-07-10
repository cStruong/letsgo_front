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
        return (
            <div style={{height: "100%", width: "100%"}}>
                <div className="expenseCont">
                    <div className="expenseConth3" style={{textAlign: "center"}}>
                    Unpaid<button className="expenseAddBtn" onClick={this.handleToggle} style={ {color: "#3bd80c", backgroundColor: "transparent", borderColor: "transparent", float: "right"} }> + </button>
                    </div>
                {this.state.editformshow ? <NewExpenseItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  
                    {this.props.tripObj.expense_items.map(expense_item => 
                        <ExpenseCard expense_itemObj={expense_item} />
                        )}
                </div>
                <div className="expenseCont" style={{float: "right", marginRight: "2%"}}>
                    <div className="expenseConth3" style={{textAlign: "center"}}>
                    Paid
                    </div>
                </div>
            </div>
        )
    }
}

export default Expense
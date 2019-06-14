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
            <div className="expenseCont">
            <div>
            <button onClick={this.handleToggle} style={ {float: "left"} }> ➕</button>
            </div>
            <br></br>
            <br></br>
            {this.state.editformshow ? <NewExpenseItemForm tripObj={this.props.tripObj} handleToggle={this.handleToggle}/> : null}  
                {this.props.tripObj.expense_items.map(expense_item => 
                    <ExpenseCard expense_itemObj={expense_item} />
                    )}
            </div>
        )
    }
}

export default Expense
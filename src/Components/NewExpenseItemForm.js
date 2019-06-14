import React from 'react'

import { connect } from 'react-redux'
import { createExpenseItem } from '../Redux/actions.js'

class NewExpenseItemForm extends React.Component {

    state = {
        name: "",
        estimated_cost: null
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    newExpenseItemSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/expenseitems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                estimated_cost: this.state.estimated_cost,
                trip_id: this.props.tripObj.id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(newExpenseItemObj => {
            this.props.createExpenseItem(newExpenseItemObj)
        })

    }

    render() {
        return (
            <div className="expenseItemForm">
                <form onSubmit={(event) => {this.newExpenseItemSubmit(event); this.props.handleToggle();}}>
                    <label>Expense: </label>
                    <input onChange={this.changeHandler} type='textfield' placeholder="(e.g. Airplane Tickets, Hotel" name="name" value={this.state.name}/>
                    <br></br>
                    <label>Estimated Cost: $</label>
                    <input onChange={this.changeHandler} type='numberfield' placeholder="(e.g. 400)" name="estimated_cost" value={this.state.estimated_cost}/>
                    <br></br>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { createExpenseItem })(NewExpenseItemForm)
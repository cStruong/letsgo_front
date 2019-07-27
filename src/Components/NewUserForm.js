import React from 'react'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn } from '../Redux/actions.js'


import FormError from '../Containers/FormError.js'

class NewUserForm extends React.Component {

    state = {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        errorshow: false,
        error: {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3005/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => {
            return response.json();
        })
        .then(parsedNewUserobj => {
            if (!parsedNewUserobj.error) {
                localStorage.setItem('token', parsedNewUserobj.token)
                this.props.logIn(parsedNewUserobj.user);
            }
            return parsedNewUserobj;
        })
        .then((parsedNewUserobj) => {
            if (!parsedNewUserobj.error) {
                this.props.history.push('/user')
            } else {
                this.setState({
                    errorshow: true,
                    error: parsedNewUserobj.error
                })
            }
        })
    }

    render() {
        return (
            <div className="newUserFormOutter">
                <div className="newUserFormInner">
                    <button onClick={this.props.handleSignup} className="cancelBtn">X</button>
                    <h1 style={ {marginTop:"15%", color: "black"} }>Create a New Account!</h1>
                    {this.state.errorshow ? <FormError error={this.state.error} /> : null}
                    <form onSubmit={this.handleSubmit}>
                        <input required value={this.state.username} className="tripformfield" onChange={this.handleChange} type="textfield" placeholder="Username" name="username"/>
                        <br></br>
                        <br></br>
                        <input required value={this.state.password} className="tripformfield" onChange={this.handleChange} type="textfield" placeholder="Password" name="password"/>
                        <br></br>
                        <br></br>
                        <input required value={this.state.email} className="tripformfield" onChange={this.handleChange} type="textfield" placeholder="Email" name="email"/>
                        <br></br>
                        <br></br>
                        <input required value={this.state.first_name} className="tripformfield" onChange={this.handleChange} type="textfield" placeholder="Firstname" name="first_name"/>
                        <br></br>
                        <br></br>
                        <input required value={this.state.last_name} className="tripformfield" onChange={this.handleChange} type="textfield" placeholder="Lastname" name="last_name"/>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <button style={ {backgroundColor: "black", color: "white", fontWeight: "bold"} } className="tripformfield" onChange={this.handleChange} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { logIn })(withRouter(NewUserForm))
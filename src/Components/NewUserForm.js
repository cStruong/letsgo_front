import React from 'react'

class NewUserForm extends React.Component {

    state = {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log("teehee")
    }

    render() {
        return (
            <div className="newUserFormOutter">
                <div className="newUserFormInner">
                    <button onClick={this.props.handleSignup}className="cancelBtn">X</button>
                    <h1>Create a New Account!</h1>
                    <form>
                        <input onChange={this.handleChange} type="textfield" placeholder="Username" name="username"/>
                        <br></br>
                        <input onChange={this.handleChange} type="textfield" placeholder="Password" name="password"/>
                        <br></br>
                        <input onChange={this.handleChange} type="textfield" placeholder="Email" name="email"/>
                        <br></br>
                        <br></br>
                        <input onChange={this.handleChange} type="textfield" placeholder="Firstname" name="first_name"/>
                        <br></br>
                        <input onChange={this.handleChange} type="textfield" placeholder="Lastname" name="last_name"/>
                        <br></br>
                        <button onChange={this.handleChange} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewUserForm
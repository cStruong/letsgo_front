import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../Redux/actions.js'
class Login extends React.Component {
    //state 
    state = {
        username: "",
        password: ""
    }

    handleLoginChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLoginSubmit = (event) => {
        event.preventDefault()
        
        fetch("http://localhost:3005/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => {
            return response.json();
        })
        .then(returnedLoginInfo => {
            window.localStorage.setItem('token', returnedLoginInfo.token)
            this.props.logIn(returnedLoginInfo.user);
                if (returnedLoginInfo.user !== undefined) {
                    this.props.history.push('/user');
                }
        })
    }

    render() {

        if (!localStorage.getItem("token")) {
            return (
                <div onSubmit={this.handleLoginSubmit} className="login"> 
                    <form>
                        <h2>Login to Let'sGo!</h2>
                        <input onChange={this.handleLoginChange} className="loginfield" type='textfield' placeholder="Username" name="username" value={this.state.username}/> 
                        <br></br>
                        <input onChange={this.handleLoginChange} className="loginfield" type='textfield' placeholder="Password" name="password" value={this.state.password}/>
                        <br></br>

                        <button className="loginfield" type='submit'>Sign In</button>
                        <p>----- OR -----</p>

                        <button>Sign Up!</button>
                    </form>
                </div>
            )
        } else { 
            return (
                <React.Fragment>
                    {this.props.history.push('/user')}
                </React.Fragment>
            )

        }   
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps, { logIn })(withRouter(Login))
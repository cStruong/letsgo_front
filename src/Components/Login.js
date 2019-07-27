import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../Redux/actions.js'
import NewUserForm from './NewUserForm.js';
import FormError from '../Containers/FormError.js'
class Login extends React.Component {
    //state 
    state = {
        username: "",
        password: "",
        signupclicked: false,
        errorshow: false,
        error: {}
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
            if (!returnedLoginInfo.error) {
                window.localStorage.setItem('token', returnedLoginInfo.token)
                this.props.logIn(returnedLoginInfo.user);
                    if (returnedLoginInfo.user !== undefined) {
                        this.props.history.push('/user');
                    }
            } else {
                this.setState({
                    errorshow: true,
                    error: returnedLoginInfo.error
                })
            } 
        })
    }

    handleSignup = (event) => {
        this.setState({
            signupclicked: !this.state.signupclicked
        })
    }

    render() {

        if (!localStorage.getItem("token") || localStorage.getItem("token") === 'undefined' ) {
            return (
                <div>
                    <h1 className="sitesummary" >.Let's Go!..on an adventure</h1>
                    <div onSubmit={this.handleLoginSubmit} className="login"> 
                        <form style={ {marginTop: "5%"} }>
                            <h2 className="slidetextlogo">Let'sGo!</h2>
                            <br></br>
                            <p className="slidetextlogo">The Premier Group Trip Planning App.</p>
                            {this.state.errorshow ? <FormError error={this.state.error} /> : null}
                            <h2 style={ {marginTop: "15%"} }>Login</h2>
                            <input required onChange={this.handleLoginChange} className="loginfield" type='textfield' placeholder="Username" name="username" value={this.state.username}/> 
                            <br></br>
                            <input required onChange={this.handleLoginChange} className="loginfield" type='password' placeholder="Password" name="password" value={this.state.password}/>
                            <br></br>

                            <button className="loginfield" type='submit'>Sign In</button>
                            <br></br>
                            <br></br>
                            <p>----- OR -----</p>
                            <br></br>
                            <br></br>
                            <button onClick={this.handleSignup}>Sign Up!</button>
                        </form>
                        {this.state.signupclicked ? <NewUserForm handleSignup={this.handleSignup}/> : null}  
                    </div>
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
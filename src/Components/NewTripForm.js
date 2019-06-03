import React from 'react'
import { connect } from 'react-redux'
import { createTrip } from '../Redux/actions.js'
import NameForm from './NameForm.js'



class NewTripForm extends React.Component{

    state = {
        destination: "",
        date: undefined,
        picture: "",
        nameField: false
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleNameEdit = () => {
        this.setState({
            nameField: !this.state.nameField
        })
    }

    tripCreateHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:3005/trips", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                admin_id: this.props.currentUser.id,
                destination: this.state.destination,
                date: this.state.date,
                picture_url: this.state.picture
            })
        })
        .then(response => {
            return response.json();
        })
        .then(parsedNewTrip => {
            fetch('http://localhost:3005/usertrips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application.json'
                },
                body: JSON.stringify({
                   user_id: this.props.currentUser.id,
                   trip_id: parsedNewTrip.id,
                   total_balance: 0,
                   paid: 0
                })
            })
            .then(response => {
                return response.json();
            })
            .then(parsedNewUserTrip => {
                this.props.createTrip(parsedNewUserTrip);
            })
        })
    }

    defaultPic = require("../assets/defaultprofilepic.png")
    photo = this.props.currentUser.profile_picture !== null ? null : this.defaultPic

    render() {
        return (
            <div className="tripform">
                <div className="profilecont">
                    {this.state.nameField ? <NameForm toggleNameEdit={this.toggleNameEdit}/> : this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name} <button onClick={this.toggleNameEdit} className="hoverbutton">✏️</button>
                    <div className="profilepic" style={ {backgroundImage: `url(${this.photo})`} }></div>
                </div>
                <hr></hr>
                <div className="tripformtitle">Create a New Trip!</div>
                <form onSubmit={this.tripCreateHandler}>
                    <br></br>
                    <img style={ {float: "left", marginLeft: '5%', position: "relative", top: "-6px"} }src={ require('../assets/destinationmarker.png') }/>
                    <input className="tripformfield" value={this.state.destination} onChange={this.changeHandler} type="textfield" placeholder="Destination (e.g. Tokyo)" name="destination"/>
                    <br></br>
                    <br></br>

                    <img style={ {float: "left", marginLeft: '5%'} }src={ require('../assets/calendaricon.png') }/>
                    <input className="tripformfield" value={this.state.date} onChange={this.changeHandler} type="date" placeholder="07/18/19" name="date"/>

                    <p className="tripformfield" style={ {fontSize: "16px", paddingTop: "5%"} }>Trip Picture:</p>
                    <input className="tripformfield" value={this.state.picture} onChange={this.changeHandler} type="textfield" placeholder="Picture URL" name="picture" />
                    <button className="tripformfield" style={ {borderRadius: '25px', marginTop: "10%" } }type="submit">Create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentTrip: state.currentTrip
    }
}

export default connect(mapStateToProps, { createTrip })(NewTripForm)
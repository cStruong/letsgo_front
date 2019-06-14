import React from 'react'

import { connect } from 'react-redux'

import YelpCard from '../Components/YelpCard.js'

class Yelp extends React.Component {

    state = {
        recommendations: {businesses: []}
    }

    componentDidMount() {
        fetch('http://localhost:3005/trips/yelp', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                destination: this.props.currentTrip.destination
            })
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(parsedData => {
            if (parsedData.error) {
                this.setState({
                    recommendations: "error"
                })
            } else {
            this.setState({
                recommendations: parsedData
            })
            }
        })
    }

    render() {
        if (this.state.recommendations === "error") {
            return (
                <div className="clipboard">
                <div className="yelpcont">
                    <h2>Yelp was unable to find destination.</h2>
                </div>
                </div>

            )
        } else {
            return (
                <div className="yelpcont">
                    <h2>Businesses near your destination</h2>
                    {this.state.recommendations.businesses.map(recommendation =>
                            <YelpCard yelpObj={recommendation}/>
                        )}
                </div>
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

export default connect(mapStateToProps)(Yelp)
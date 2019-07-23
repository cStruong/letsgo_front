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

        let yelpLogo = require('../assets/Yelp.png')

        if (this.state.recommendations === "error") {
            return (
                <div className="clipboard">
                <div className="yelpcont">
                    <h2 className="yelpHeader">Suggestions</h2>
                    <h2>Yelp was unable to find destination.</h2>
                </div>
                </div>

            )
        } else {
            return (
                <div className="yelpcont">
                    <h2 className="yelpHeader">Suggestions</h2>
                    <div className="yelpdisplay">Powered by <a href="http://www.yelp.com" target="_blank"><img className="yelplogo" src={yelpLogo} /></a></div>
                    <div className="yelpInnerCont">
                        {this.state.recommendations.businesses.map(recommendation =>
                                <YelpCard yelpObj={recommendation}/>
                            )}
                    </div>
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
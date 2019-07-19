import React from 'react'

const YelpCard = (props) => {
    return(
        <div className="yelpcard">
            <img className="yelpimg" src={props.yelpObj.image_url} />
            <div className="yelpName"><a href={props.yelpObj.url} target="_blank">{props.yelpObj.name} </a></div>
            <br></br>
            <p style={ {float: "left", color: "black", margin: "0",marginLeft: "2%", padding: "0"} }>Price Range:</p> <p style={ {float:"left", margin: "0", padding: "0"} }>{props.yelpObj.price}</p>
           <br></br>
           <br></br>
            <p style={ {float: "left", color: "black", margin: "0", marginLeft: "2%", padding: "0"} }>Rating: </p> <p style={ {float:"left", margin: "0", padding: "0"} }> {props.yelpObj.rating} / 5</p>
        </div>
    )
}

export default YelpCard
import React from 'react'

const YelpCard = (props) => {
    return(
        <div style={ { borderBlockColor: "black"} } className="yelpcard">
            <img className="yelpimg" src={props.yelpObj.image_url} />
            <a href={props.yelpObj.url} target="_blank">{props.yelpObj.name} </a>
            <br></br>
            {props.yelpObj.price}
        </div>
    )
}

export default YelpCard
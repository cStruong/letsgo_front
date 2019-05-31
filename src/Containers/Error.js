import React from 'react';

import { withRouter } from 'react-router-dom'


class Error extends React.Component{


    handleClick = () => {
        this.props.history.push('/user')
    }
    render() {
        return (
            <div className="error">
                <h1>This page does not exist</h1>
                <button onClick={this.handleClick}>Return to the main menu</button>
                <br></br>
                <br></br>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="rick-roll"></iframe>
            </div>
        )
    }
}

export default withRouter(Error);
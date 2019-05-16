import React from 'react';

import Login from '../Components/Login.js'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <Login />
            </div>
        )
    }
}

export default Home
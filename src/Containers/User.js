import React from 'react';

import NewTripForm from '../Components/NewTripForm.js'
import TripList from '../Components/TripList.js'

class User extends React.Component {

    state = {
        currentUser: {},
        trips: []
    }

    render() {
        return (
            <div>
                <NewTripForm />
                <TripList />
            </div>
        )
    }
}

export default User
import React from 'react'

class NewTripForm extends React.Component{
    render() {
        return (
            <div className="tripform">
                Create a New Trip!
                <form>
                    <br></br>
                    <label>Destination: </label>
                    <input type="textfield" placeholder="Tokyo, Japan" />
                    <br></br>
                    <br></br>
                    <label>Date: </label>
                    <input type="date" placeholder="07/18/19" />
                    <br></br>
                    <br></br>
                    <label>Upload a Trip Picture:</label>
                    <input type="file" placeholder="Direct Picture URL here"/>
                    <br></br>
                    <br></br>
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
}

export default NewTripForm
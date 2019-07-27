import React from 'react'

const FormError = (props) => {
    return (
        <div className="form-error">
           {props.error.map(error => 
            <li>{error}</li>
            )}
        </div>
    )
}

export default FormError
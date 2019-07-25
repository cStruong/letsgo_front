import React from 'react'

const FormError = (props) => {
    console.log(props.error)
    return (
        <div>
           {props.error}
        </div>
    )
}

export default FormError
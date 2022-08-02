
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import "./toggable.css"

//fijate los parametros opcionales, que interesante!
const Togglable = React.forwardRef(({buttonLabel,children, ifBlock, elseBlock = <div></div>}, ref) => {
  const [visible, setVisible] = useState(false)

 
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='conteiner 0'>
      <div className='inicio-principal'>
        <button  onClick={toggleVisibility}>
          {buttonLabel}
        </button>

      
      </div>
      <div>{!!children ? children : visible ? ifBlock : elseBlock}</div>
    </div>

  )
})
Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
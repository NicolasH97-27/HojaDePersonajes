import "./notification.css"

const Notification = ({ message }) => {
    const trampilla = {
      marginTop: '1%',
      color: 'white'
    }
    if (message === null) {
      return (
        
      <div style={trampilla} >
          . 
      </div>)
    }
  
    return (
      <div className="inicio">
        {message}
      </div>
    )
  }
  export default Notification;
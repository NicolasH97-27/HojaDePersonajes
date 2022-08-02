import React from 'react'
import "./loginform.css"

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <body>
    <div className="center">
      <h1>Logeate y armá tu personaje</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input 
            type="user"
            value={username}
            onChange={handleUsernameChange} />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input 
            type="password"
            value={password}
            onChange={handlePasswordChange} />
          <span></span>
          <label>Password</label>
        </div>
        
        <input type="submit" value="Login"/>
        
      </form>
    </div>

  </body>
  )
}

export default LoginForm
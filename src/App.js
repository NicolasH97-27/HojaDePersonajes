import React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react'

import infoService from './services/info'
import loginService from './services/login'

import Form from './components/Form/Form.js';
import LoginForm from './components/LoginForm/LoginForm';
import Togglable from './components/Toggable/Toggable';
import Notification from './components/Notification/Notification';

const LOGINSTATE = "LOGIN"
const HOMESTATE = "HOME"

function App() {
  const [info, setInfo] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [screen,setScreen] = useState(LOGINSTATE)

  // useEffect(() => {
    
  // }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setScreen(HOMESTATE)
      infoService.setToken(user.token)
      infoService
    .getAll()
    .then(informacion => {
    setInfo(informacion)
  })
    }
  }, [])
  


  const handleLogin = async (event) => {
    
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setScreen(HOMESTATE)
      infoService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addInfo = (infoObject) => {
    infoService
      .create(infoObject)
  }

  // const foto = () =>{
  //   return(
  //     <div>
  //       <img src="https://lossietereinos.com/wp-content/uploads/2020/12/EoVcSwEU4AA3E8i.jpeg" width="500px"></img>
  //       <button style={{margin: 39}} onClick={() => setUser(null)}>log out</button>
  //     </div>
  //   )
  // }
  


  return (
    <div >
      <Notification  message={errorMessage} />
      {screen === LOGINSTATE && user===null ?
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
     : screen===HOMESTATE ? 
      <div>
      <p className='inicio'>{user.name} ingresó</p>
      
      <Form info={info} onClick={addInfo} message={setErrorMessage}/>
      
      </div> :
      
      <div>ERROR!{console.log(screen, user)}</div>
    }
  </div>   

  );
}

export default App;

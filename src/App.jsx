import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './Pages/Auth/AuthPage'
import Usetask from './Pages/Usertask/Usetask'
import Home from './Pages/Home/Home'
import { TokenAuthContext } from './Context/Authcontext'
import { useContext } from 'react'

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(TokenAuthContext)

  return (
    <>
  
     <Routes>
      <Route path='/login' element={<AuthPage/>}/>
      <Route path='/' element={<AuthPage register/>}/>
      <Route path='/home' element={isAuthorised?<Home/>:<AuthPage/>}/>
    </Routes>
    </>
  )
}

export default App

import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route , Routes} from 'react-router-dom'
import Home from './Components/UserComp/Home'
import CreateCourse from './Components/AdminComp/Courses/CreateCourse'
import Register from './Components/UserComp/Register'
import Login from './Components/UserComp/Login'
import SingleCorsePage from './Components/UserComp/SingleCoursePage'
import { api } from './Configer/configure'
import { MyContext } from './Context/AuthContext'
import Lectures from './Components/LecturerComp/Lectures'

function App() {
  const [count, setCount] = useState(0)

  const {state , dispatch} = useContext(MyContext)

  const getUserData = async () => {
    try {
      const jwtData = localStorage.getItem('MyToken');
  
      if (!jwtData) {
        console.error('JWT token not found in local storage');
        return; // Exit early if token is not found
      }
  
      const response = await api.post('api/v1/users/getUserProfile', { jwt: jwtData });
      if (response.data.success) {
        dispatch({type : 'ADD_USER' , payload : response.data.user})
      }
  
      // Handle response data if needed
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/createCourse' element={<CreateCourse/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/getLectures' element={<Lectures/>}/>
          <Route path='singleCourse/:id' element={<SingleCorsePage/>}/>
      </Routes>
    </>
  )
}

export default App

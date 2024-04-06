import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../Configer/configure'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../Context/AuthContext.jsx'
import Navbar from './NavBar.jsx'
import Footer from './Footer.jsx'

const Home = () => {
  const [allData, setallData] = useState([])
  const [currentUser, setcurrentUser] = useState({})

  const navigate = useNavigate()
  const { state, dispatch } = useContext(MyContext)

  const getAllCourseData = async () => {
    try {
      const response = await api.get('/api/v1/course/get')
      console.log(response.data, 'This is a response data');
      if (response.data.success) {
        setallData(response.data.allCoursesData)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCourseData()
  }, [])

  return (
    <>
      <Navbar />
      <div className='text-red-600 text-center text-2xl my-6 font-bold'>All Courses</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-2  gap-y-8 gap-x-5 '>
        {allData.map((data) => (
          <div key={data._id} onClick={() => navigate(`singleCourse/${data._id}`)} className='border border-gray-300 rounded-md shadowBox px-1 pb-3 '>
            <div className=' flex flex-col gap-y-1'>
              <h1 className=' mt-1 font-ThirdFont text-lg text-center font-bold text-slate-900'>{data.CourseName}</h1>
              <div>
                <img src={data.CourseImgURL} alt="" />
              </div>
              <p><span className=' text-[18px] font-bold font-ThirdFont'>Level :</span> {data.CourseLevel} </p>
              <p><span className='text-[18px] font-bold font-ThirdFont'>Course Duration :</span> {data.CourseDuration}</p>
              <p> <span className='text-[18px] font-bold font-ThirdFont'>Description : </span>{data.CourseDescription}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Home

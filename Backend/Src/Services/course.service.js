const Course = require("../Model/course.model.js");
const Lecture = require("../Model/lecture.model.js");
const User = require("../Model/user.model.js");

const createCourseData = async (userData) => {
  try {
    console.log('Starting course data creation...');
    const { CourseName, CourseLevel, CourseDescription, CourseImgURL, CourseDuration, LecturesData } = userData;

      const createdCourse =  new Course({
      CourseName,
      CourseLevel,
      CourseDescription,
      CourseImgURL,
      CourseDuration
    })

    let course = createdCourse.save()
    return course

  } catch (error) {
    console.error('Error creating course data:', error);
  }
};



//     const createdCourse =  new Course({
//       CourseName,
//       CourseLevel,
//       CourseDescription,
//       CourseImgURL,
//       CourseDuration
//     })

//     // createdCourse.save()
//     // return createdCourse

//   } catch (error) {
//     throw new Error('error is', error)
//   }
// }

const getAllCoursesService =async () => {
  try {
    const allCoursesData = await Course.find().populate('lectures');
    
    if (allCoursesData) {
      console.log(allCoursesData, 'aaaaaaaaaaaaaaaaaaaaa');
      return allCoursesData
    }
  } catch (error) {
    throw new Error(error)
  }
}
const getSingleCourseService = async (id) => {
  try {
    const singleCourseData = await Course.findById(id).populate({
      path: 'lectures', populate: { path: 'lecturer' } // Populate the lecturer field inside the lectures array
    });
    console.log(singleCourseData);

    
    
    console.log(singleCourseData , 'siniininini');
    if (singleCourseData) {
      return singleCourseData
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createCourseData,
  getAllCoursesService,
  getSingleCourseService
}
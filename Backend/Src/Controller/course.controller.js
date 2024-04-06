const Course = require("../Model/course.model");
const Lecture = require("../Model/lecture.model.js");
const User = require("../Model/user.model.js");
const { createCourseData, getAllCoursesService, getSingleCourseService } = require("../Services/course.service.js");


const createCourse = async (req, res) => {
  try {
    console.log('ha bhai hit hua me');

    console.log(req.body , 'resBody is here');

    const course = await createCourseData(req.body)

    return res.status(200).json({message : 'Course is created', success : true, course})
  } catch (error) {
    return res.status(404).json({message : 'Course creation failed', success : false})
  }
}

const getAllCourses = async (req, res) => {
  try {
    console.log('This is getAllCorses controller');

    const allCoursesData = await getAllCoursesService()

    return res.status(200).json({message: 'Courses data is fetched', success: true, allCoursesData})
  } catch (error) {
    return res.status(404).json({message: 'Courses data fetching error', success: false})
  }
}
const getSingleCourse = async (req, res) => {
  try {
    const id = req.params.id
    console.log('This is singleCouser controller',id);

    const SingleCourse = await getSingleCourseService(id)
    console.log(SingleCourse, 'singleCoursedfdfd');

    return res.status(200).json({message: 'Courses data is fetched', success: true, SingleCourse})
  } catch (error) {
    return res.status(404).json({message: 'Courses data fetching error', success: false})
  }
}

const addLectureForCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const lectures = req.body;
    
    console.log(lectures, 'lectures');
    console.log('This is singleCourse controller', id);
    
    const singleCourse = await getSingleCourseService(id);
    const singleCourseId = singleCourse._id;
    
    console.log(singleCourse, 'singleCourse');

    for (let lecture of lectures) {
      const lecturerName = lecture.lecturer.trim();

      const lecturer = await User.findOne({ name: lecturerName }).populate('lectures');
      console.log('Found lecturer:', lecturer);

      for (const lectureItem of lecturer.lectures) {
        console.log(lectureItem.date.toISOString().slice(0, 10) , 'lectureItem.date');
        console.log(lecture.date , 'lecture.date');
        console.log(lectureItem.date , 'lectureItem.date.date');
        if (lectureItem.date.toISOString().slice(0, 10) === lecture.date) {
            console.log('lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll');
            return res.status(500).json({message : "Lecture is assigned for lecturer on same date, can't assign another on the same date", success : false})
        }
    }

    // Iterate through all lectures of the lecturer
for (const lectureItem of lecturer.lectures) {
  // Split the time strings to extract the hour part
  const oldHours = parseInt(lectureItem.time.split(':')[0], 10); // Extract old hour and convert to number
  const newHours = parseInt(lecture.time.split(':')[0], 10); // Extract new hour and convert to number

  // Add 5 hours to the old hour
  const oldHoursPlusFive = oldHours + 5;

  // Check if the new hour is within 5 hours of the old hour
  if ((newHours > oldHoursPlusFive) && (lectureItem.date.toISOString().slice(0, 10) === lecture.date)) {
      // If the gap condition is not met for any lecture, return the error response
      return res.status(503).json({ message: 'Next lecture can be scheduled after a five-hour gap from the previous lecture.', success: false });
  }
}

// If the loop completes without returning, proceed with adding the new lecture
// ...

  
      
      if (lecturer) {
        console.log('Lecturer found:', lecturerName);
        // If lecturer found, save the lecture document with their ID
        const createdLecture = new Lecture({
          Course: singleCourseId,
          date: lecture.date,
          time: lecture.time,
          lecturer: lecturer._id // Save the ID of the lecturer
        });

        await createdLecture.save();
        console.log(`Lecture saved for course '${singleCourse.CourseName}' with lecturer '${lecturerName}':`, createdLecture);

        // Update user's lectures array
        lecturer.lectures.push(createdLecture._id);
        await lecturer.save();
        console.log(`Lecture added to user '${lecturerName}' lectures array`);

        // Update course's lectures array
        singleCourse.lectures.push(createdLecture._id);
        await singleCourse.save();
        console.log(`Lecture added to course '${singleCourse.CourseName}' lectures array`);
      } else {
        console.error(`Lecturer '${lecturerName}' not found`);
        // Handle the case where the lecturer is not found (e.g., throw an error or skip saving the lecture)
      }
    }

    return res.status(200).json({ message: 'Lecture created', success: true });
  } catch (error) {
    console.error('Error creating lectures:', error.message);
    return res.status(500).json({ message: 'Lectures creation failed', success: false });
  }
}




module.exports = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  addLectureForCourse
}
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  CourseName: {
    type: String,
    required: true
  },
  CourseLevel: {
    type: String,
    required: true
  },
  CourseDescription: {
    type: String,
    required: true
  },
  CourseImgURL: {
    type: String,
    required: true
  },
  CourseDuration: {
    type: String,
    required: true
  },
  lectures: [{
    type: mongoose.Schema.Types.ObjectId, // Reference to the lecture model
    ref: 'lectures' // Name of the related model
  }]
});


const Course = mongoose.model('courses', courseSchema);
module.exports = Course;
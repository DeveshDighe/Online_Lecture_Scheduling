const express = require('express');
const { createCourse, getAllCourses, getSingleCourse, addLectureForCourse } = require('../Controller/course.controller');
const router = express.Router()

router.post('/create', createCourse)
router.get('/get', getAllCourses)
router.post('/post/:id', getSingleCourse)
router.post('/addLectures/:id', addLectureForCourse)


module.exports = router;
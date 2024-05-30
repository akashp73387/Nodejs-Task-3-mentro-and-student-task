import express from 'express'

import  {createMentor,createStudent,assignStudentsToMentor,assignAndChangeMentor,showStudentsForMentor,showPreviousMentorsForStudent,} from '../Controllers/taskcontroller.js';


const router = express.Router();

// CREATE Mentor
router.post("/mentor", createMentor);

// CREATE Student
router.post("/student",createStudent );

// Assign
router.post("/mentor/:mentorId/assign", assignStudentsToMentor);

// Assign and change
router.put("/student/:studentId/assignMentor/:mentorId", assignAndChangeMentor);

// Show all students for a particular mentor
router.get("/mentor/:mentorId/students", showStudentsForMentor);

// Show the previously assigned mentor for a particular student
router.get("/student/:studentId/Mentor", showPreviousMentorsForStudent);


export default router;
import Student from '../Models/Student.js';
import Mentor from  '../Models/Mentor.js';


 // Function to create a new mentor
 export const createMentor = async (req, res) => {
   try {
     const mentor = new Mentor(req.body);
     await mentor.save();
     res.send(mentor);
   } catch (error) {
     res.status(400).send(error);
   }
 };

 // Function to create a new student
 export const createStudent = async (req, res) => {
   try {
     const student = new Student(req.body);
     await student.save();
     res.send(student);
   } catch (error) {
     res.status(400).send(error);
   }
 };

 // Function to assign students to a mentor
 export const assignStudentsToMentor = async (req, res) => {
   try {
     const mentor = await Mentor.findById(req.params.mentorId);
     const students = await Student.find({ _id: { $in: req.body.students } });
     students.forEach((student) => {
       student.cMentor = mentor._id;
       student.save();
     });
     mentor.students = [
       ...mentor.students,
       ...students.map((student) => student._id),
     ];
     await mentor.save();
     res.send(mentor);
   } catch (error) {
     res.status(400).send(error);
   }
 };

 // Function to assign and change mentor for a student
 export const assignAndChangeMentor = async (req, res) => {
   try {
     const student = await Student.findById(req.params.studentId);
     const nMentor = await Mentor.findById(req.params.mentorId);

     if (student.cMentor) {
       student.pMentor.push(student.cMentor);
     }

     student.cMentor = nMentor._id;
     await student.save();
     res.send(student);
   } catch (error) {
     res.status(400).send(error);
   }
 };

 // Function to show all students for a particular mentor
 export const showStudentsForMentor = async (req, res) => {
   try {
     const mentor = await Mentor.findById(req.params.mentorId).populate(
       "students"
     );
     res.send(mentor.students);
   } catch (error) {
     res.status(400).send(error);
   }
 };

 // Function to show the previously assigned mentors for a particular student
 export const showPreviousMentorsForStudent = async (req, res) => {
   try {
     const student = await Student.findById(req.params.studentId).populate(
       "Mentor"
     );
     if (!student) {
       return res.status(404).json({ error: "No previous Mentor Available" });
     } else {
       res.send(student.pMentor);
     }
   } catch (error) {
     res.status(400).send(error);
   }
 };


 
const Student = require("../model/usermodel");


const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();  
    res.status(200).json(students);
    } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  } 
};

const getStudentProfile = async (req, res) => {
    try {
        const student = await Student.findOne({ userId: req.params.userId }).populate('userId', 'name email');
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateStudentProfile = async (req, res) => {
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }   
        ).populate('userId', 'name email');
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const recordAttendance = async (req, res) => {
    try {
        const { date, status } = req.body;
        const student = await
            Student.findOne({ userId: req.params.userId
        });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }   
        student.attendance.push({ date, status });
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const recordMarks = async (req, res) => {
    try {
        const { subject, score, total } = req.body; 
        const student = await Student.findOne({ userId: req.params.userId });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        student.marks.push({ subject, score, total });
        await student.save();

        res.status(200).json(student);
    } catch (error) {

        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.find
            OneAndDelete({ userId: req.params.userId });
        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {
  getAllStudents,
  getStudentProfile,
  updateStudentProfile,
  recordAttendance,
  recordMarks,
  deleteStudent,
};
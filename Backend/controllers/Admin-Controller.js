const User = require("../model/User-Model");
const Class = require("../model/Class-Model");
const StudentProfile = require("../model/Student-Model");
const Attendance = require("../model/Attendance-Model");
const ExamMark = require("../model/Exam-Marks-Model");
const bcrypt = require("bcryptjs");
const Teacher = require("../model/Teacher-Model");

// const createTeacher = async (req, res) => {
//   try {
//     const hash = await bcrypt.hash(req.body.password, 10);

//     const username = req.body.username.toUpperCase().trim();
//     await User.create({
//       username: username,
//       password: hash,
//       role: "Teacher"
//     });
//     res.json("Teacher created");
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const createTeacher = async (req, res) => {
  try {
    console.log('=== CREATE Teacher REQUEST ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { username, password, name } = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const normalizedUsername = username.toUpperCase().trim();

    // Check if username already exists
    const existingUser = await User.findOne({ username: normalizedUsername });
    if (existingUser) {
      return res.status(400).json({ error: `Username '${normalizedUsername}' already exists. Please choose a different username.` });
    }

    // Create user account
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: normalizedUsername,
      password: hash,
      role: "Teacher"
    });
    console.log('User created:', user._id);

    // Drop legacy index if it exists to prevent duplicate key error on null EmployeeID
    try {
      await Teacher.collection.dropIndex('EmployeeID_1');
    } catch (err) {
      // Index doesn't exist or already dropped
    }

    // Create student profile
    const teacherProfile = await Teacher.create({
      userId: user._id,
      name: name.toUpperCase().trim()
    });
    console.log('Teacher profile created:', teacherProfile);

    res.json({ message: "Teacher created successfully" });
  } catch (error) {
    console.error("Error creating teacher:", error);
    if (error.code === 11000) {
      if (error.message.includes('username')) {
        return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      }
      return res.status(400).json({ error: 'Duplicate entry found.' });
    }
    res.status(500).json({ error: error.message });
  }
};


const createAdmin = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username.toUpperCase(),
      password: hash,
      role: "Admin"
    });
    res.json("Admin created");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    // console.log('=== CREATE CLASS REQUEST ===');
    // console.log('Request body:', JSON.stringify(req.body, null, 2));

    if (!req.body.Class || !req.body.Division || !req.body.AcademicYear) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Drop old index if it exists
    try {
      await Class.collection.dropIndex('Class_1');
      console.log('Dropped old Class_1 index');
    } catch (indexError) {
      console.log('Index Class_1 does not exist or already dropped');
    }

    const newClass = await Class.create(req.body);
    console.log('Class created successfully:', newClass);
    res.json({ message: "Class created", data: newClass });
  } catch (error) {

    res.status(500).json({ error: error.message, details: error.name });
  }
};

const assignTeacher = async (req, res) => {
  try {
    const { teacherId, classId } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $set: { assignedTeacher: teacherId } },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json({ message: 'Teacher assigned successfully', data: updatedClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'Teacher' }).select('_id username');

    // Find assigned class for each teacher
    const teachersWithClasses = await Promise.all(teachers.map(async (teacher) => {
      const teacherProfile = await Teacher.findOne({ userId: teacher._id }).select('name');
      const assignedClasses = await Class.find({ assignedTeacher: teacher._id })
        .select('_id Class Division AcademicYear');

      return {
        ...teacher.toObject(),
        name: teacherProfile ? teacherProfile.name : null,
        assignedClasses: assignedClasses || [],
        assignedClass: assignedClasses.length > 0 ? assignedClasses[0] : null
      };
    }));

    res.json(teachersWithClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().select('_id Class Division AcademicYear assignedTeacher');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find()
      .populate('userId', 'username')
      .populate('classId', 'Class Division AcademicYear');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addExamMarks = async (req, res) => {
  try {
    const { studentId, subject, examType, marks, total } = req.body;
    await ExamMark.create({ studentId, subject, examType, marks, total });
    res.json({ message: "Exam marks added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getTeacherClassSummary = async (req, res) => {
  try {
    console.log('=== GET TEACHER CLASS SUMMARY ===');
    const teacherId = req.user?.id;
    console.log('Teacher ID:', teacherId);

    if (!teacherId) {
      return res.status(401).json({ error: 'Teacher not authenticated' });
    }

    // Get teacher's assigned classes
    const teacherClasses = await Class.find({ assignedTeacher: teacherId })
      .select('Class Division AcademicYear');
    console.log('Teacher classes found:', teacherClasses);

    const summaries = [];

    for (const classInfo of teacherClasses) {
      const students = await StudentProfile.find({ classId: classInfo._id })
        .populate('userId', 'username');
      console.log(`Students in class ${classInfo.Class} ${classInfo.Division}:`, students.length);

      const classStudents = [];

      for (const student of students) {
        const attendance = await Attendance.find({ studentId: student._id });
        console.log(`Attendance records for student ${student.userId?.username}:`, attendance.length);
        const total = attendance.length;
        const present = attendance.filter(record => record.status === 'Present').length;
        const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

        classStudents.push({
          student,
          total,
          present,
          absent: total - present,
          percentage: parseFloat(percentage)
        });
      }

      summaries.push({
        class: classInfo,
        students: classStudents
      });
    }

    console.log('Final summaries:', summaries.length);
    res.json(summaries);
  } catch (error) {
    console.error('Error in getTeacherClassSummary:', error);
    res.status(500).json({ error: error.message });
  }
};

const debugAttendance = async (req, res) => {
  try {
    const totalAttendance = await Attendance.countDocuments();
    const totalStudents = await StudentProfile.countDocuments();
    const totalClasses = await Class.countDocuments();

    res.json({
      totalAttendance,
      totalStudents,
      totalClasses,
      message: 'Debug info'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getStudentAttendanceSummary = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const attendance = await Attendance.find({ studentId })
//       .populate({
//         path: 'studentId',
//         populate: {
//           path: 'userId',
//           select: 'username'
//         }
//       })
//       .sort({ date: -1 });

//     const total = attendance.length;
//     const present = attendance.filter(record => record.status === 'Present').length;
//     const absent = total - present;
//     const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

//     res.json({
//       student: attendance[0]?.studentId,
//       total,
//       present,
//       absent,
//       percentage,
//       records: attendance
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getClassAttendanceSummary = async (req, res) => {
//   try {
//     const { classId } = req.params;

//     // Get all students in the class
//     const students = await StudentProfile.find({ classId })
//       .populate('userId', 'username');

//     const summaries = [];

//     for (const student of students) {
//       const attendance = await Attendance.find({ studentId: student._id });
//       const total = attendance.length;
//       const present = attendance.filter(record => record.status === 'Present').length;
//       const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

//       summaries.push({
//         student: student,
//         total,
//         present,
//         absent: total - present,
//         percentage
//       });
//     }

//     res.json(summaries);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const getExamReport = async (req, res) => {
//   try {
//     const marks = await ExamMark.find()
//       .populate('studentId', 'username')
//       .sort({ examType: 1 });
//     res.json(marks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getTeacherClasses = async (req, res) => {
  try {
    console.log('=== GET TEACHER CLASSES DEBUG ===');
    console.log('JWT User:', req.user);

    const teacherId = req.user?.id;
    console.log('Teacher ID from JWT:', teacherId);

    if (!teacherId) {
      return res.status(401).json({ error: 'Teacher not authenticated' });
    }

    // Check all classes first
    const allClasses = await Class.find();
    console.log('All classes in database:', allClasses);

    const classes = await Class.find({ assignedTeacher: teacherId });
    console.log('Classes assigned to teacher:', classes);

    if (classes.length === 0) {
      console.log('No classes found for teacher ID:', teacherId);
      // Check if teacher ID exists in any assignments
      const anyAssignments = await Class.find({ assignedTeacher: { $exists: true } });
      console.log('Classes with any teacher assignments:', anyAssignments);
    }

    res.json(classes);
  } catch (error) {
    console.error('Error getting teacher classes:', error);
    res.status(500).json({ error: error.message });
  }
};

// const getTeacherStudents = async (req, res) => {
//   try {
//     console.log('=== GET TEACHER STUDENTS DEBUG ===');
//     console.log('JWT User:', req.user);

//     const teacherId = req.user?.id;
//     console.log('Teacher ID from JWT:', teacherId);

//     if (!teacherId) {
//       console.log('No teacher ID found in JWT');
//       return res.status(401).json({ error: 'Teacher not authenticated' });
//     }

//     const teacherClasses = await Class.find({ assignedTeacher: teacherId });
//     console.log('Teacher classes found:', teacherClasses);

//     const classIds = teacherClasses.map(cls => cls._id);
//     console.log('Class IDs:', classIds);

//     const students = await StudentProfile.find({ classId: { $in: classIds } })
//       .populate('userId', 'username')
//       .populate('classId', 'Class Division AcademicYear');

//     console.log('Students found:', students.length);
//     console.log('Students data:', students);

//     res.json(students);
//   } catch (error) {
//     console.error('Error getting teacher students:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

const getDashboardStats = async (req, res) => {
  try {
    const totalTeachers = await User.countDocuments({ role: 'Teacher' });
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const totalClasses = await Class.countDocuments();

    res.json({ totalTeachers, totalStudents, totalClasses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTeacherDashboardStats = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ error: 'Teacher not authenticated' });
    }
    const classes = await Class.find({ assignedTeacher: teacherId })
      .select('Class Division AcademicYear');
    const classIds = classes.map(cls => cls._id);
    const totalStudents = await StudentProfile.countDocuments({ classId: { $in: classIds } });

    res.json({
      myClasses: classes,
      totalStudents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getStudentDashboardStats = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ error: 'Student not authenticated' });
//     }
//     const studentProfile = await Student
//       .findOne({ userId })
//       .populate('classId', 'Class Division AcademicYear');
//     if (!studentProfile) {
//       return res.status(404).json({ error: 'Student profile not found' });
//     }

//     res.json({ class: studentProfile.classId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const DeleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await User.findByIdAndDelete(id);
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, classId } = req.body;

    const updateData = { username: username.toUpperCase().trim() };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update teacher user info
    await User.findByIdAndUpdate(id, updateData, { new: true });

    // Handle class assignment if classId is provided
    if (classId !== undefined) {
      // First, remove this teacher from any class they might already be assigned to
      await Class.updateMany({ assignedTeacher: id }, { $unset: { assignedTeacher: "" } });

      // Then, if a new classId is provided, assign the teacher to it
      if (classId) {
        await Class.findByIdAndUpdate(classId, { assignedTeacher: id });
      }
    }

    res.json({ message: 'Teacher updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' }).select('_id username');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const updateData = { username: username.toUpperCase().trim() };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};










module.exports = {
  createTeacher,
  createAdmin,
  createClass,
  assignTeacher,
  getTeachers,
  getClasses,
  getStudents,
  // createStudent, 
  // markAttendance, 
  addExamMarks,
  // getTeacherAttendanceReport,
  getTeacherClassSummary,
  debugAttendance,
  // getStudentAttendanceSummary,
  // getClassAttendanceSummary,
  // getExamReport,
  getTeacherClasses,
  // getTeacherStudents,
  getDashboardStats,
  getTeacherDashboardStats,
  // getStudentDashboardStats,
  DeleteTeacher,
  updateTeacher,
  getAdmins,
  updateAdmin,
  deleteAdmin,
};

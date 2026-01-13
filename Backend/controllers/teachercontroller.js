const Teacher = require("../model/Teacher");

const getTeacherProfile = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ userId: req.params.userId }).populate('userId', 'name email');
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTeacherProfile = async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        ).populate('userId', 'name email');
        if (!updatedTeacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

};


const assignClassToTeacher = async (req, res) => {
    try {
        const { className } = req.body;
        const teacher = await Teacher.findOne({ userId: req.params.userId });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        teacher.classesAssigned.push(className);
        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const assignSubjectToTeacher = async (req, res) => {
    try {
        const { subject } = req.body;
        const teacher = await Teacher.findOne({ userId: req.params.userId });
        if (!teacher) {

            return res.status(404).json({ error: "Teacher not found" });
        }
        teacher.subjectsTaught.push(subject);
        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const removeClassFromTeacher = async (req, res) => {
    try {
        const { className } = req.body;
        const teacher = await Teacher.findOne({ userId: req.params.userId });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        teacher.classesAssigned = teacher.classesAssigned.filter(
            (cls) => cls !== className
        );
        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

};

const removeSubjectFromTeacher = async (req, res) => {
    try {
        const { subject } = req.body;
        const teacher = await Teacher.findOne({ userId: req.params.userId });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        teacher.subjectsTaught = teacher.subjectsTaught.filter(
            (sub) => sub !== subject
        );
        await teacher.save();
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteTeacherProfile = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findOneAndDelete({ userId: req.params.userId });
        if (!deletedTeacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json({ message: "Teacher profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    getTeacherProfile,
    updateTeacherProfile,
    assignClassToTeacher,
    assignSubjectToTeacher,
    removeClassFromTeacher,
    removeSubjectFromTeacher,
    deleteTeacherProfile,
};

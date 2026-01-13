const admin = require("../model/Admin");

const getAdmin = async (req, res) => {
    try {
        const adminProfile = await admin.findOne({ userId: req.params.userId }).populate('userId', 'name email');
        if (!adminProfile) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.status(200).json(adminProfile);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAdmin
};
    
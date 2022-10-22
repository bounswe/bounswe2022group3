const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    enrollment_id: {
        unique: true,
        type: String,
    },
    user_id: {
        unique: true,
        type: String
    },
    course_id: {
        unique: true,
        type: String
    },
    created_at: {
        type: Date
    },
    is_active: {
        type: Boolean
    },
    notes: {
        type: [String]
    },
    progress: {
        type: Map,
        of: Boolean
    }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

const createEnrollment = async (enrollment_id) => {
    var enrollment = new Enrollment({ enrollment_id })
    const res = await enrollment.save()
    return res
}

const deleteEnrollment = async (enrollment_id) => {
    const res = await Enrollment.findOneAndDelete({ enrollment_id })
    return res
}

module.exports = { Enrollment, createEnrollment, deleteEnrollment };

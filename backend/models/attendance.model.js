import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentDetails: [
    {
      studentId: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["Absent", "Present"],
        required: true,
      },
    },
  ],
  classId: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;

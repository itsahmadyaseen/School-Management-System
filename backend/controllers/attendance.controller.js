import Attendance from "../models/attendance.model.js";

export const addAttendance = async (req, res) => {
  const { studentDetails } = req.body;
  try {
    const date = new Date(Date.now()).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const existingAttendance = await Attendance.findOne({ date });

    if (existingAttendance) {
      console.log("Attendance already exists");
      return res.status(400).json({ message: "Attendance already exists" });
    }

    const newAttendance = new Attendance({
      studentDetails,
      classId: req.user.classId,
      date,
    });

    await newAttendance.save();

    console.log("Attendance added");
    return res.status(201).json({ message: "Attendance added" });
  } catch (error) {
    console.log("Error adding attendance", error);
    return res
      .status(500)
      .json({ message: "Error adding attendance", data: error });
  }
};

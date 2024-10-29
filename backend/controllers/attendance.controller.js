import mongoose from "mongoose";
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

export const getAttendanceForStudent = async (req, res) => {
  const studentId = new mongoose.Types.ObjectId(req.user.id);
  const classId = new mongoose.Types.ObjectId(req.user.classId);

  try {
    const attendanceDetails = await Attendance.aggregate([
      {
        $match: { classId },
      },
      {
        $unwind: "$studentDetails",
      },
      {
        $match: { "studentDetails.studentId": studentId },
      },
      {
        $project: {
          studentId: "$studentDetails.studentId",
          status: "$studentDetails.status",
          date: "$date",
        },
      },
    ]);

    console.log("Fetched Attendance for student");

    return res.status(200).json({
      message: "Attendance for student fetched",
      data: attendanceDetails,
    });
  } catch (error) {
    console.log("Error fetching Attendance for student", error);

    return res.status(500).json({
      message: "Error fetching Attendance for student",
      data: error,
    });
  }
};

export const getAttendanceForTeacher = async (req, res) => {
  const classId = new mongoose.Types.ObjectId(req.user.classId);
  const { date } = req.query;
  try {
    const attendanceDetails = await Attendance.aggregate([
      {
        $match: { classId, date },
      },
      {
        $unwind: "$studentDetails",
      },
      {
        $lookup: {
          from: "students",
          localField: "studentDetails.studentId",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      {
        $unwind: "$studentInfo",
      },
      {
        $project: {
          _id: 0,
          studentId: "$studentDetails.studentId",
          studentName: "$studentInfo.fullname",
          status: "$studentDetails.status",
        },
      },
    ]);

    console.log("Fetched Attendance for teacher");

    return res.status(200).json({
      message: "Attendance for teacher fetched",
      data: attendanceDetails,
    });
  } catch (error) {
    console.log("Error fetching Attendance for teacher", error);

    return res.status(500).json({
      message: "Error fetching Attendance for teacher",
      data: error,
    });
  }
};

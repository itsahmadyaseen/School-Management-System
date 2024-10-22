import Question from "../models/question.model.js";
import Response from "../models/response.model.js";
import Test from "../models/test.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createTest = async (req, res) => {
  const classId = req.user.classId;
  const { name, subjectId, startTime, endTime } = req.body;
  // console.log(name, subjectId, startTime, endTime);

  const [startHours, startMinutes] = startTime?.split(":");
  const [endHours, endMinutes] = endTime?.split(":");

  const startDate = new Date();
  startDate.setHours(startHours);
  startDate.setMinutes(startMinutes);

  const endDate = new Date();
  endDate.setHours(endHours);
  endDate.setMinutes(endMinutes);

  try {
    console.log("file", req.file?.path);
    const pdfLocalPath = req.file?.path;

    let pdfUrl;
    let newTest;

    if (pdfLocalPath) {
      pdfUrl = await uploadOnCloudinary(pdfLocalPath);
      if (!pdfUrl) {
        console.log("Cannot get cloudinary file path");
        return res.status(400).json({
          message: "Cannot get cloudinary file path",
        });
      }

      newTest = new Test({
        name,
        class: classId,
        subject: subjectId,
        startTime: startDate,
        endTime: endDate,
        isActive: true,
        responsePdfUrl: pdfUrl,
      });
    } else {
      const selectedQuestions = await Question.find({
        class: classId,
        subject: subjectId,
      }).select("_id");

      newTest = new Test({
        name,
        class: classId,
        questions: selectedQuestions,
        subject: subjectId,
        startTime: startDate,
        endTime: endDate,
        isActive: true,
      });
    }

    await newTest.save();
    console.log("Test created");
    return res.status(201).json({ message: "Test created ", data: newTest });
  } catch (error) {
    console.log("Error creating test ", error);
    return res
      .status(500)
      .json({ message: "Error creating test", data: error });
  }
};

export const getTests = async (req, res) => {
  try {
    await checkAndUpdateStatus();

    const tests = await Test.find()
      .populate({
        path: "class",
        select: "name",
      })
      .populate({
        path: "questions",
        select: "",
      })
      .populate({
        path: "subject",
        select: "name",
      })
      .sort({ createdAt: -1 });

    const isActive = tests.isActive;

    console.log("Tests fetched ");
    return res.status(200).json({ message: "Tests fetched ", data: tests });
  } catch (error) {
    console.log("Error fetching tests ", error);
    return res
      .status(500)
      .json({ message: "Error fetching tests", data: error });
  }
};

export const getTestById = async (req, res) => {
  try {
    const testId = req.params.testId;

    const alreadySubmitted = await Response.findOne({
      student: req.user.id,
      test: testId,
    });
    if (alreadySubmitted) {
      console.log("User has already submitted", alreadySubmitted);
      return res.status(403).json({
        message: "User has already submitted",
      });
    }

    const test = await Test.findById(testId)
      .populate({
        path: "class",
        select: "name",
      })
      .populate({
        path: "questions",
        select: "",
      })
      .populate({
        path: "subject",
        select: "name",
      });

    console.log("Test fetched ", test);
    return res.status(200).json({ message: "Tests fetched ", data: test });
  } catch (error) {
    console.log("Error fetching test ", error);
    return res
      .status(500)
      .json({ message: "Error fetching test", data: error });
  }
};

export const checkAndUpdateStatus = async () => {
  try {
    const currTime = new Date();
    const tests = await Test.find({
      isActive: true,
      endTime: { $lt: currTime },
    });

    if (tests.length > 0) {
      await Test.updateMany(
        { _id: { $in: tests.map((test) => test._id) } },
        { $set: { isActive: false } }
      );
      console.log("Exam status updated");
    }
  } catch (error) {
    console.error("Error updating exam status");
    return;
  }
};

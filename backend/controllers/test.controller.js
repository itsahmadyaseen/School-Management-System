import Question from "../models/question.model.js";
import Response from "../models/response.model.js";
import Test from "../models/test.model.js";

export const createTest = async (req, res) => {
  const { name, classId, subjectId, startTime, endTime } = req.body;

  try {
    const selectedQuestions = await Question.find({
      class: classId,
      subject: subjectId,
    }).select("_id");

    console.log("selectedQuestions ", selectedQuestions);

    const newTest = new Test({
      name,
      class: classId,
      questions: selectedQuestions,
      subject: subjectId,
      startTime,
      endTime,
    });

    await newTest.save();
    console.log("Test created ", newTest);
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

    console.log("Tests fetched ", tests);
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

    const alreadySubmitted = await Response.findOne({ student: req.user.id });
    if (alreadySubmitted) {
      console.log("User has already submitted", alreadySubmitted);
      return res.status(403).json({
        message: "User has already submitted",
        data: alreadySubmitted,
      });
    }

    const tests = await Test.findById(testId)
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

    console.log("Test fetched ", tests);
    return res.status(200).json({ message: "Tests fetched ", data: tests });
  } catch (error) {
    console.log("Error fetching test ", error);
    return res
      .status(500)
      .json({ message: "Error fetching test", data: error });
  }
};

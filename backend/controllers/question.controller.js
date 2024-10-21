import mongoose from "mongoose";
import Question from "../models/question.model.js";
import Subject from "../models/subject.model.js";

export const createQuestion = async (req, res) => {
  const { body, options, answer, marks, classId } = req.body;
  const subjectId = req.params.subjectId;
  console.log(subjectId, classId);

  try {
    const newQuestion = new Question({
      body,
      options,
      answer,
      marks,
      subject: subjectId,
      class: classId,
    });

    await newQuestion.save();

    await Subject.findByIdAndUpdate(subjectId, {
      $push: {
        questions: newQuestion._id,
      },
    });
    console.log("Question created ", newQuestion);
    return res
      .status(201)
      .json({ message: "Question created ", data: newQuestion });
  } catch (error) {
    console.log("Error creating question ", error);
    return res
      .status(500)
      .json({ message: "Error creating question", data: error });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate({
        path: "subject",
        select: "name",
      })
      .sort({ createdAt: 1 });

    console.log("Questions fetched", questions);
    return res
      .status(200)
      .json({ message: "Questions fetched", data: questions });
  } catch (error) {
    console.log("Error creating question", error);
    return res
      .status(500)
      .json({ message: "Error creating question", data: error });
  }
};

export const deleteQuestion = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const questionId = new mongoose.Types.ObjectId(req.query.questionId);

    await Question.findByIdAndDelete(questionId, { session });

    if (!question) {
      await session.abortTransaction();
      session.endSession();
      console.log("Cannot find question", question);
      return res.status(400).json("Cannot Find Question");
    }

    await Subject.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } },
      { session }
    );

    console.log("Question deleted");
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Question deleted" });
  } catch (error) {  
    await session.abortTransaction();
    session.endSession();
    console.log("Error deleting question ", error);
    return res
      .status(500)
      .json({ message: "Error deleting question", data: error });
  }
};

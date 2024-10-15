import Question from "../models/question.model.js";
import Response from "../models/response.model.js";
import Result from "../models/result.model.js";

export const submitResponse = async (req, res) => {
  const { answers, testId } = req.body;
  // console.log("answers : ", answers);

  if (!answers) {
    console.log("Cannot get answers", answers);
    return res.status(400).json({ message: "Cannot get answers" });
  }

  let marksObtained = 0;

  try {
    for (let i = 0; i < answers.length; i++) {
      const currQues = answers[i].question;
      const currAns = answers[i].answer;
      // console.log(ques);

      try {
        const questionDetails = await Question.findById(currQues).select(
          "answer marks"
        );

        if (!questionDetails) {
          console.log("Cannot find question", currQues);
          return res.status(404).json({ message: "Cannot find question" });
        }

        // correct anwer?
        // console.log("question", questionDetails.answer);
        // console.log("answer", currAns);

        if (questionDetails.answer == currAns) {
          marksObtained += questionDetails.marks;
        }
      } catch (error) {
        console.log("Error fetching questions", error);
        return res
          .status(500)
          .json({ message: "Error fetching questions", data: error });
      }
    }
    // console.log(marksObtained);

    const newResponse = new Response({
      answers,
      test: testId,
      student: req.user.id,
      score: marksObtained,
    });

    await newResponse.save();

    console.log("New response submitted", newResponse);
    return res
      .status(201)
      .json({ message: "New response submitted", data: newResponse });
  } catch (error) {
    console.log("Error submitting response", error);
    return res
      .status(500)
      .json({ message: "Error submitting response", data: error });
  }
};

export const generateResult = async (req, res) => {
  const { feedback, testId } = req.body;
  const studentId = req.user.id;

  try {
    const obtainedMarks = await Response.findOne({
      test: testId,
      student: studentId,
    }).select("score -_id");
    console.log(obtainedMarks, "score");

    const newResult = new Result({
      student: req.user.id,
      test: testId,
      feedback,
      score: obtainedMarks.score,
    });

    await newResult.save();
    console.log("Result generated : ", newResult);
    return res
      .status(201)
      .json({ message: "Result Generated ", data: newResult });
  } catch (error) {
    console.log("Error generating result : ", error);
    return res
      .status(201)
      .json({ message: "Error generating result ", data: error });
  }
};

export const fetchResult = async (req, res) => {
  try {
    const testId = req.params.testId;

    const resultDetails = await Response.findOne({ test: testId })
      .populate({
        path: "answers.question",
        select: "answer marks",
      })
      .select("answers student score");

    console.log(resultDetails);
    return res
      .status(200)
      .json({ message: "Fetched result", data: resultDetails });
  } catch (error) {
    console.log("Error fetching results", error);
    return res
      .status(500)
      .json({ message: "Error fetching results", data: error });
  }
};

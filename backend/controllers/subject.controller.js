import Subject from "../models/subject.model.js";

export const createSubject = async (req, res) => {
  const { name, classId, questions } = req.body;

  try {
    const newSubject = new Subject({
      name,
      class: classId,
      questions,
    });

    await newSubject.save();
    console.log("Subject created ", newSubject);
    return res
      .status(201)
      .json({ message: "Subject created ", data: newSubject });
  } catch (error) {
    console.log("Error creating subject ", error);
    return res
      .status(500)
      .json({ message: "Error creating subject", data: error });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate({
        path: "class",
        select: "name",
      })
      .populate("questions")
      .sort({ createdAt: -1 });

    console.log("Subjects fetched ", subjects);
    return res
      .status(200)
      .json({ message: "Subjects fetched ", data: subjects });
  } catch (error) {
    console.log("Error creating subjects ", error);
    return res
      .status(500)
      .json({ message: "Error creating subjects", data: error });
  }
};

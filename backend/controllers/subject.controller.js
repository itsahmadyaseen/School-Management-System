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

    console.log("Subjects fetched ");
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

export const getSubjectsByClass = async (req, res) => {
  try {
    const classId = req.user.classId;

    const subjects = await Subject.find({ class: classId }).populate({
      path: "class",
      select: "name",
    });
    console.log("Subjects by class fetched ");
    return res
      .status(200)
      .json({ message: "Subjects fetched ", data: subjects });
  } catch (error) {
    console.log("Error fetching subjects", error);
    return res
      .status(500)
      .json({ message: "Error creating subjects", data: error });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;

    const subject = await Subject.findById(subjectId)
      .populate({
        path: "class",
        select: "name",
      })
      .populate({
        path: "questions",
        select: "",
      })

      .sort({ createdAt: -1 });

    console.log("Subject fetched by id ", subject);
    return res.status(200).json({ message: "Subject fetched ", data: subject });
  } catch (error) {
    console.log("Error fetching subject ", error);
    return res
      .status(500)
      .json({ message: "Error fetching subject", data: error });
  }
};

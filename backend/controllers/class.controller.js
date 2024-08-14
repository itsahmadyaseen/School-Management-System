import Class from "../models/class.model.js";

export const createClass = async (req, res) => {
  const { name, teacher, students } = req.body;

  try {
    const newClass = new Class({
      name,
      teacher,
      students,
    });

    await newClass.save();
    console.log("Class created ", newClass);
    return res.status(201).json({ message: "Class created ", data: newClass });
  } catch (error) {
    console.log("Error creating class ", error);
    return res
      .status(500)
      .json({ message: "Error creating class", data: error });
  }
};

export const getClassDetails = async (req, res) => {
  const { classId } = req.body;

  try {
    const classDetails = await Class.findById(classId)
      .populate({
        path: "teacher",
        select: "fullname",
      })
      .populate({
        // [id, id, id,...]
        path: "students",
        select: "fullname",
      })
      .sort({ name: 1 });

    console.log("Class fetched ", classDetails);
    return res
      .status(200)
      .json({ message: "Class fetched ", data: classDetails });
  } catch (error) {
    console.log("Error creating class ", error);
    return res
      .status(500)
      .json({ message: "Error creating class", data: error });
  }
};

export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate({
        path: "teacher",
        select: "fullname",
      })
      .populate({
        // [id, id, id,...]
        path: "students",
        select: "fullname",
      })
      .sort({ name: 1 });

    console.log("Classes fetched ", classes);
    return res.status(200).json({ message: "Classes fetched ", data: classes });
  } catch (error) {
    console.log("Error creating class ", error);
    return res
      .status(500)
      .json({ message: "Error creating class", data: error });
  }
};

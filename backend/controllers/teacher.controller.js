import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import TeacherIdentifier from "../models/teacherIdentifier.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { uid, email, password, fullname, classId } = req.body;

  try {
    const correctUid = await TeacherIdentifier.findOne({ uid, email });

    if (!correctUid) {
      console.log("Provide correct uid or email ");
      return res.status(400).json({ message: "Provide correct uid or email " });
    }

    const existingUser = await Teacher.findOne({ email });
    if (existingUser) {
      console.log("Teacher is already registered ");
      return res.status(400).json({ message: "Teacher is already registered" });
    }

    const alreadyHaveATeacher = await Class.findOne({
      classId,
      teacher: { $ne: null },
    });

    if (alreadyHaveATeacher) {
      console.log("This class already has its teacher registered");
      return res.status(400).json({
        message: "This class already has its teacher registerd",
        data: alreadyHaveATeacher,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newTeacher = new Teacher({
      fullname,
      email,
      password: hashedPassword,
      class: classId,
    });

    await newTeacher.save();

    await Class.findByIdAndUpdate(classId, {
      $set: {
        teacher: newTeacher._id,
      },
    });

    console.log("Teacher registerd :", newTeacher);
    return res
      .status(201)
      .json({ message: "Teacher registerd", data: newTeacher });
  } catch (error) {
    console.log("Error registering  :", error);
    return res.status(500).json({ message: "Error registering", data: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await Teacher.findOne({ email });
    if (!existingUser) {
      console.log("Teacher does not exist ");
      return res.status(400).json({ message: "Teacher does not exist" });
    }
    console.log("password", existingUser.password);
    console.log(password);

    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = { id: existingUser._id, role: "teacher" };
        const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        res.cookie("token", token);

        console.log("Logged in successfully", token);
        return res
          .status(200)
          .json({
            message: "Logged in successfully",
            token,
            id: existingUser._id,
            role: "teacher",
          });
      } else {
        console.log("Invalid credentials ", err);
        return res
          .status(401)
          .json({ message: "Invalid credentials", data: err });
      }
    });
  } catch (error) {
    console.log("Error logging in", error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });

    console.log("Fetched Teachers", teachers);
    return res
      .status(200)
      .json({ message: "Fetched Teachers", data: teachers });
  } catch (error) {
    console.log("Error fetching Teachers", error);
    return res
      .status(500)
      .json({ message: "Error fetching Teachers", data: error });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    
    const teacher = await Teacher.findById(id);

    console.log("Fetched Teacher", teacher);
    return res.status(200).json({ message: "Fetched Teacher", data: teacher });
  } catch (error) {
    console.log("Error fetching Teachers", error);
    return res
      .status(500)
      .json({ message: "Error fetching Teachers", data: error });
  }
};

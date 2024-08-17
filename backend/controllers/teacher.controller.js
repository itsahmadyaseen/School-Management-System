import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import TeacherIdentifier from "../models/teacherIdentifier.model.js";
import bcrypt from "bcryptjs";

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
      return res
        .status(400)
        .json({
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

    bcrypt.compare(existingUser.password, password, (err, data) => {
      if (data) {
        const authClaims = { id: existingUser._id, role: "teacher" };
        const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        res.cookie("token", token);
      } else {
        console.log("Invalid credentials ", err);
        return res
          .status(401)
          .json({ message: "Invalid credentials", data: err });
      }
    });

    console.log("Logged in successfully", token);
    return res.status(200).json({ message: "Logged in successfully", token });
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
import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import Class from "../models/class.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  const { email, password, fullname, classId } = req.body;

  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      console.log("Student already registered ");
      return res.status(400).json({ message: "Student already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newStudent = new Student({
      fullname,
      email,
      password: hashedPassword,
      class: classId,
    });

    await newStudent.save();

    await Class.findByIdAndUpdate(classId, {
      $push: {
        students: newStudent._id,
      },
    });

    console.log("Student registerd");
    return res
      .status(201)
      .json({ message: "Student registerd", data: newStudent });
  } catch (error) {
    console.log("Error registering  :", error);
    return res.status(500).json({ message: "Error registering", data: error });
  }
};

export const login = async (req, res) => {
  try {
    console.log(process.env.PASETO_SECRET_KEY);

    const { email, password } = req.body;

    const existingUser = await Student.findOne({ email });
    if (!existingUser) {
      console.log("Student does not exist");
      return res.status(400).json({ message: "Student does not exist" });
    }

    bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = { id: existingUser._id, role: "student" };
        const token = jwt.sign(authClaims, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        console.log("Logged in successfully", authClaims);
        return res.status(200).json({
          message: "Logged in successfully",
          token,
          id: existingUser.id,
          role: "student",
        });
      } else {
        console.log("Invalid credentials");
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.log("Error logging in", error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};

export const getStudents = async (req, res) => {
  try {
    const studentDetails = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    console.log("Fetched Student", studentDetails);
    return res
      .status(200)
      .json({ message: "Fetched Student", data: studentDetails });
  } catch (error) {
    console.log("Error fetching Student", error);
    return res
      .status(500)
      .json({ message: "Error fetching Student", data: error });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.body;
    const student = await Student.findById(id);

    console.log("Fetched Student", student);
    return res.status(200).json({ message: "Fetched Student", data: student });
  } catch (error) {
    console.log("Error fetching Students", error);
    return res
      .status(500)
      .json({ message: "Error fetching Students", data: error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });
    console.log("User logged out");
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log("Error logging out", error);
    res.status(500).json({ message: "Error logging out", error });
  }
};

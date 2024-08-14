import mongoose from "mongoose";

const teacherIdentifierSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  isUsed: {
    type: Boolean,
    required: true,
    default:false
  },
});

const TeacherIdentifier = mongoose.model(
  "TeacherIdentifier",
  teacherIdentifierSchema
);

export default TeacherIdentifier;

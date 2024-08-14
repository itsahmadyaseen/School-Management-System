import mongoose from "mongoose";

const studentIdentifierSchema = new mongoose.Schema({
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
    type: boolean,
    required: true,
    default: false,
  },
});

const StudentIdentifier = mongoose.model(
  "StudentIdentifier",
  studentIdentifierSchema
);

export default StudentIdentifier;

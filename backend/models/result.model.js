import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    feedback: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;

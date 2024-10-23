import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: String,
      },
    ],
    responsePdfUrl: {
      type: String,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;

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
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },

    score: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;

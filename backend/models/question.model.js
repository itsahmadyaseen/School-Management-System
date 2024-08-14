import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },

    options: [
      {
        type: String, // or options:[string]--same
      },
    ],

    answer: {
      type: String,
    },
    marks: {
      type: Number,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;

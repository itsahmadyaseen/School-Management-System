import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    startTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },

    responsePdfUrl:{
      type:String,
    },

    maxMarks: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", testSchema);

export default Test;

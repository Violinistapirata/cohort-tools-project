const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    // enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    linkedinUrl: {
      type: String,
      default: "",
    },

    languages: {
      type: [String],
      enum: [
        "English",
        "Spanish",
        "French",
        "German",
        "Portuguese",
        "Dutch",
        "Other",
      ],
    },

    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"],
    },

    background: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "https://i.imgur.com/r8bo8u7.png",
    },

    cohort: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cohort",
      },
    ],

    projects: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

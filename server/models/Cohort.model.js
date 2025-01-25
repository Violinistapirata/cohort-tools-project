const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cohortSchema = new Schema(
  {
    cohortSlug: {
      type: String,
      required: [true, "This field is required"],
      unique: true
    },

    cohortName: {
      type: String,
      required: [true, "This field is required"]
    },

    program: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
    },

    format: {
      type: String,
      enum: ["Full Time", "Part Time"]
    },
    
    campus: {
        type: String,
        enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"]
    },
    
    startDate: {
        type: Date,
        default: Date.now
    },

    endDate: {
      type: Date
    },

    inProgress: {
      type: Boolean,
      default: false
    },

    programManager: {
      type: String,
      required: [true, "This field is required"],
    },
    
    leadTeacher: {
        type: String,
        required: [true, "This field is required"],
    },

    totalHours: {
      type: Number,
      default: 360
    }
  },
  {
    timestamps: true,
  }
);

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;

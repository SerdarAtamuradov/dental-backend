const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Patient" },
    pain: String,
    diagnosis: String,
    price: Number,
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    pain: String, //в видео dentNumber
    diagnosis: String,
    price: Number,
    date: String,
    time: String,
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;

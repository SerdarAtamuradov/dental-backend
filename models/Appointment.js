const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    pain: String, //Боль
    diagnosis: String, //Диагноз
    price: Number, //Цена
    date: String, //Дата
    time: String, //Время
    patient: { type: Schema.Types.ObjectId, ref: "Patient" }, //Пациент и его данные
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;

const express = require("express");
const cors = require("cors");

const db = require("./core/db");
const {
  patientValidation,
  appointmentValidation,
} = require("./utils/validation");
const { PatientCtrl, AppointmentCtrl } = require("./controllers/");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/patients", PatientCtrl.all);
app.post("/patients", patientValidation.create, PatientCtrl.create);

app.get("/appointments", AppointmentCtrl.all);
app.post("/appointments", appointmentValidation.create, AppointmentCtrl.create);
app.delete("/appointments/:id", AppointmentCtrl.remove);
app.patch(
  "/appointments/:id",
  appointmentValidation.update,
  AppointmentCtrl.update
);

app.listen(6666, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("Server runned");
});
//http://localhost:6666/patients
//http://localhost:6666/appointments
/*
{
    "pain": "Головная боль", 
    "diagnosis": "мигрень",
    "price": 10,
    "date": "11.05.2021",
    "time": "10.30",
    "patient": "619446e8e8bbe421e0c4e776"
  }

  {
    "pain": "Боль в животе", 
    "diagnosis": "диарея",
    "price": 10,
    "date": "11.05.2021",
    "time": "10.30",
    "patient": "619446e8e8bbe222e0c4e776"
}
*/

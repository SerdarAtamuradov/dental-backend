const { validationResult } = require("express-validator");
const { Appointment, Patient } = require("../models");

function AppointmentController() {}
//CRUD- CREATE READ UPDATE DELETE
const create = async function (req, res) {
  const errors = validationResult(req);

  const data = {
    patient: req.body.patient,
    pain: req.body.pain,
    diagnosis: req.body.diagnosis,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
    // return res.status(422).json({ errors:  });
  }

  try {
    await Patient.findOne({ _id: data.patient });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
  /*  
  const patient = await Patient.findOne({ _id: data.patient });

  if (!patient) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
  */

  Appointment.create(data, function (err, doc) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    }

    res.status(201).json({
      status: true,
      data: doc,
    });
  });
};

const show = async function (req, res) {
  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId).exec();
    res.json({
      status: "success",
      data: appointment,
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "APPOINTMENT_NOT_FOUND",
    });
  }
};

const update = async function (req, res) {
  const appointmentId = req.params.id;
  const errors = validationResult(req);

  const data = {
    patient: req.body.patient,
    pain: req.body.pain,
    diagnosis: req.body.diagnosis,
    price: req.body.price,
    date: req.body.date,
    time: req.body.time,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
  }

  /*  
  const patient = await Patient.findOne({ _id: appointmentId });

  if (!patient) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
  */

  Appointment.updateOne(
    { _id: appointmentId },
    { $set: data },
    function (err, doc) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
        });
      }

      if (!doc) {
        return res.status(404).json({
          status: false,
          message: "APPOINTMENT_NOT_FOUND",
        });
      }

      res.json({
        status: true,
        data: doc,
      });
    }
  );
};

const remove = async function (req, res) {
  const appointmentId = req.params.id;

  try {
    await Appointment.findOne({ _id: appointmentId });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "APPOINTMENT_NOT_FOUND",
    });
  }

  Appointment.deleteOne({ _id: appointmentId }, (err) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    }

    res.json({
      status: "success",
    });
  });
};

const all = function (req, res) {
  Appointment.find({})
    .populate("patient")
    .exec(function (err, docs) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
        });
      }

      res.json({
        status: "success",
        data: docs,
      });
    });
};

AppointmentController.prototype = {
  all,
  create,
  show,
  update,
  remove,
};

module.exports = AppointmentController;

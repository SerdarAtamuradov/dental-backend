const { validationResult } = require("express-validator");
const { Patient } = require("../models");

function PatientController() {}
//CRUD- CREATE READ UPDATE DELETE
const create = function (req, res) {
  const errors = validationResult(req);
  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
    // return res.status(422).json({ errors:  });
  }

  Patient.create(data, function (err, doc) {
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
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId).exec();
    res.json({
      status: "success",
      data: patient,
    });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
};

const update = async function (req, res) {
  const patientId = req.params.id;
  const errors = validationResult(req);

  const data = {
    fullname: req.body.fullname,
    phone: req.body.phone,
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.array(),
    });
  }

  /*  
  const patient = await Patient.findOne({ _id: patientId });

  if (!patient) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }
  */

  Patient.updateOne({ _id: patientId }, { $set: data }, function (err, doc) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    }

    if (!doc) {
      return res.status(404).json({
        status: false,
        message: "PATIENT_NOT_FOUND",
      });
    }

    res.json({
      status: true,
    });
  });
};

const remove = async function (req, res) {
  const patientId = req.params.id;

  try {
    await Patient.findOne({ _id: patientId });
  } catch (e) {
    return res.status(404).json({
      status: false,
      message: "PATIENT_NOT_FOUND",
    });
  }

  Patient.deleteOne({ _id: patientId }, (err) => {
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
  Patient.find({}, function (err, docs) {
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

PatientController.prototype = {
  all,
  create,
  show,
  update,
  remove,
};

module.exports = PatientController;

const { validationResult } = require("express-validator");
const { Patient } = require("../models");

function PatientController() {}

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
};

module.exports = PatientController;

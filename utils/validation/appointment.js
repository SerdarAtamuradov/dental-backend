const { check } = require("express-validator");

// pain: String, //в видео dentNumber
//     diagnosis: String,
//     price: Number,
//     date: String,
//     time: String,
//     patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
const validation = {
  create: [
    check("pain").isLength({ min: 3, max: 40 }),
    check("diagnosis").isLength({ min: 4, max: 60 }),
    check("price").isInt({ min: 0, max: 10000 }),
    check("date").isLength({ min: 3, max: 50 }),
    check("time").isLength({ min: 3, max: 50 }),
    check("patient").isLength({ min: 1, max: 50 }),
  ],
  update: [
    check("pain").isLength({ min: 3, max: 40 }),
    check("diagnosis").isLength({ min: 4, max: 60 }),
    check("price").isInt({ min: 0, max: 10000 }),
    check("date").isLength({ min: 3, max: 50 }),
    check("time").isLength({ min: 3, max: 50 }),
  ],
};

module.exports = validation;

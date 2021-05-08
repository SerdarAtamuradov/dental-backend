const { check } = require("express-validator");

const validation = {
  create: [
    check("fullname").isLength({ min: 6, max: 50 }),
    check("phone").isLength({ min: 12 }),
  ],
  update: [
    check("fullname").isLength({ min: 6, max: 50 }),
    check("phone").isLength({ min: 12 }),
  ],
};

module.exports = validation;

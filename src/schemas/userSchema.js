const joi = require("joi");

// Joi Validation schema used to verify req data
const RegisterSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  confirm_password: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm Password does not match the password" }),
  phoneNumber: joi.string().required()
});

const LoginSchema = joi.object().keys({
  email: joi.string().required().email(),
  password: joi.string().min(6).required()
});

module.exports = {
    RegisterSchema,
    LoginSchema
  };
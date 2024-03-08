const joi = require("joi");

// Joi Validation schema used to verify req data
const CreateSchema = joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().required().email(),
    enquiry: joi.string(),
});

module.exports = {
    CreateSchema,
};
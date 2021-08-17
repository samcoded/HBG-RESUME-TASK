const FormModel = require("../model/form");
const Joi = require("joi");
require("dotenv").config();

const form = async (req, res) => {
  const { fullname, email, message } = req.body;
  const regschema = Joi.object().keys({
    fullname: Joi.string().required().messages({
      "string.empty": "Please input a name",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Please input an email address",
    }),
    message: Joi.string().required().messages({
      "any.required": "Add a message",
    }),
  });

  try {
    await regschema.validateAsync(req.body);
  } catch (error) {
    const errMsg = error.message;
    return res.render("index", { error: errMsg });
  }

  try {
    const result = await FormModel.create({
      email,
      fullname,
      message,
    });
    const success = "Form successfully submited";
    return res.render("index", { success: success, form: result });
  } catch (error) {
    const errMsg = "Something went wrong";
    return res.render("index", { error: errMsg });
  }
};

const viewforms = async (req, res) => {
  try {
    const forms = await FormModel.find();
    return res.render("forms", { forms: forms });
  } catch (error) {
    const errMsg = "Something went wrong";
    return res.render("forms", { error: errMsg });
  }
};

module.exports = { form, viewforms };

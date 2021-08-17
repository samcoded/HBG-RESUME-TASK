const FormModel = require("../model/form");
const Joi = require("joi");
require("dotenv").config();

const form = async (req, res) => {
  // console.log(req.body);
  const { fullname, email, message } = req.body;
  const regschema = Joi.object().keys({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  try {
    await regschema.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    const errMsg = error.message;
    return res.render("error", { error: errMsg });
  }

  try {
    const result = await FormModel.create({
      email,
      fullname,
      message,
    });
    const success = "Form successfully submited";
    return res.render("success", { success: success, form: result });
  } catch (error) {
    console.log(error);
    const errMsg = "Something went wrong";
    return res.render("error", { error: errMsg });
  }
};

const viewforms = async (req, res) => {
  try {
    const forms = await FormModel.find();
    return res.render("forms", { forms: forms });
  } catch (error) {
    console.log(error);
    const errMsg = "Something went wrong";
    return res.render("forms", { error: errMsg });
  }
};

module.exports = { form, viewforms };

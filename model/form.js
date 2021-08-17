const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Form", formSchema);

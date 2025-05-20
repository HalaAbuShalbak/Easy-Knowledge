const mongoose = require("mongoose");
// Role schema includes the basic role creation to be populated to the user
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: [{ type: String }],
});

module.exports = mongoose.model("Role", roleSchema);

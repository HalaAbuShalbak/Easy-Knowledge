const mongoose = require("mongoose");
// bcrypt for hashing the password
const bcrypt = require("bcrypt");
// mongoose validator for schema entries validation
const validate = require("mongoose-validator");
// the validation requirements for the password
const passwordValidator = validate({
  validator: "matches",
  arguments:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,12}$/,
  message:
    " The password has to be Minimum eight characters,Maximum 12 characters and contain at least one uppercase letter, one lowercase letter and one number ex:1@myPassword",
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true, validate: passwordValidator },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  img: { type: String , default:"/images/Mathematics-rafiki.png"},
});
userSchema.pre("save", async function () {
  return (
    (this.email = this.email.toLowerCase()),
    (this.password = await bcrypt.hash(this.password, 7))
  );
});

module.exports = mongoose.model("User", userSchema);

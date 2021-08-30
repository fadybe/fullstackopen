const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteGenres: [{ type: String }],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;

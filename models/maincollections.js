const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const maincollectionsSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

maincollectionsSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

maincollectionsSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  console.log(compare, user.password, password);
  return compare;
};

const maincollections = mongoose.model(
  "maincollections",
  maincollectionsSchema
);

module.exports = maincollections;

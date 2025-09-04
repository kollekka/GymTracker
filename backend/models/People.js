const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PeopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength: 8 }
}, { timestamps: true });

PeopleSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

PeopleSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const People = mongoose.model("People", PeopleSchema);

module.exports = People;

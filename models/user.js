const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema({
  name: {
    type: String,
    default: "Unknown Capybara"
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, {versionKey: false, timestamps: true})

const User = model('user', userSchema);

const joiRegister = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const joiLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    User,
    joiRegister,
    joiLogin
}

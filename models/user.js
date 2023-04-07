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
  avatarURL: {
    type: String,
    required: [true, 'Avatar is required'],
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
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

const joiVerify = Joi.object({
  email: Joi.string().email().required()
})

module.exports = {
    User,
    joiRegister,
    joiLogin,
    joiVerify
}

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
}, {versionKey: false, timestamps: true})

const Contact = model("contact", contactSchema);

const joiAdd = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required NAME field`
  }),
  email: Joi.string().email().required().messages({
    'any.required': `missing required EMAIL field`
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required PHONE field`
  }),
    
});

const joiUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

const joiUpdateStatus = Joi.object({
  favorite: Joi.bool().required().messages({
    'boolean.base': `"favorite" should be a type of 'boolean'`,
    'any.required': `missing field FAVORITE`
  }),
})


module.exports = {
    Contact,
    joiAdd,
    joiUpdate,
    joiUpdateStatus
};
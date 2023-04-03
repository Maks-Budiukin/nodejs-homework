const Joi = require('joi');

const add = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
    
});

const update = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
    
});

module.exports = {
    add,
    update
}
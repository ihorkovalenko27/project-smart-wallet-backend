// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
// const { ValidationError } = require('../helpers/errors');

// const ValidationMiddlewares = Joi.object({
//   category: Joi.string().alphanum().min(2).max(30).required(),
//   description: Joi.string().alphanum().min(2).max(30).required(),
//   type: Joi.string().alphanum().min(5).max(5).required(),
//   // owner: Joi.objectId(),
// });

// // const ValidationMiddlewares = schema.validate(req.body);
// // if (ValidationMiddlewares.error) {
// //   next(new ValidationError(ValidationMiddlewares.error.details[0].message));
// // }
// // next();

// module.exports = ValidationMiddlewares;

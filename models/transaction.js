const { Schema, model, SchemaTypes } = require('mongoose');
const Joi = require('joi');

const transactionSchema = Schema(
  {
    type: {
      type: String,
      enum: ['income', 'costs'],
      required: true,
    },
    category: {
      type: String,
      required: [true, 'category must be enter'],
      minlength: 2,
    },
    description: {
      type: String,
      required: [true, 'description must be enter'],
      minlength: 2,
    },
    sum: {
      type: Number,
      required: [true, 'sum must be enter'],
      min: 0.01,
    },
    day: {
      type: String,
      required: [true, 'day must be enter (2 characters)'],
    },
    month: {
      type: String,
      required: [true, 'month must be enter (2 characters)'],
    },
    year: {
      type: String,
      required: [true, 'year must be enter (4 characters)'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

const joiTransactionSchema = Joi.object({
  category: Joi.string().min(2).max(15).required(),
  description: Joi.string().min(2).max(40).required(),
  sum: Joi.number().integer().positive().required(),
  day: Joi.string().min(2).max(2).required(),
  month: Joi.string().min(2).max(2).required(),
  year: Joi.string().min(4).max(4).required(),
});

module.exports = { Transaction, joiTransactionSchema };

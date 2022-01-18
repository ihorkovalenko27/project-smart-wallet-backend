const { Schema, model, SchemaTypes } = require('mongoose');
// const Joi = require('joi');
// const { string } = require('joi');

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      // required: true,
    },
    type: {
      type: String,
      enum: ['income', 'costs'],
      required: true,
    },
    category: {
      type: String,
      required: true,
      minlength: 2,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
    },
    sum: {
      type: Number,
      required: [true, 'total must be enter'],
      min: 0.01,
    },
    day: { type: String },
    month: { type: String },
    year: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = Transaction;

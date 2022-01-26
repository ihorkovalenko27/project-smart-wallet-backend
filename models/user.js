const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required must be [a-zA-Z0-9]{3,30}'],
      minlength: 6,
    },
    avatarURL: {
      type: String,
    },
    balance: {
      type: Number,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

// eslint-disable-next-line func-names
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

const joiUserSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ua', 'ru'] },
  }),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

module.exports = {
  User,
  userSchema,
  joiUserSchema,
};

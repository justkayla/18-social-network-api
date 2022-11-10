const { Schema, model } = require("mongoose");
const Thought = require('./Thought');

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      // TODO: Verify if this is correct validate/match syntax
      validate: [validateEmail, "Please provide a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    // TODO: check syntax
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    // TODO: check syntax
    friends: [this],
  },
  // TODO: Verify if this is correct virtuals syntax
  {
    toJSON: {
      virtuals: {
        friendCount: {
          get() {
            return this.friends.length;
          },
        },
      },
    },
  }
);

const User = model("user", userSchema);

module.exports = User;

const { Schema, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      // getter to format timestamp
      get: (formatDate) =>
        moment(formatDate).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: {
        reactionCount: {
          get() {
            return this.reactions.length;
          },
        },
      },
    },
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;

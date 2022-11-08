const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');

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
      // TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    // TODO: Verify if this is correct way to refer to nested docs created in reactionSchema
    reactions: [reactionSchema],
  },
  // TODO: Verify if this is correct virtuals syntax
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

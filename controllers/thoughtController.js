const { Thought, User, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({ thought })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { runValidators: true, new: true }
        ).then((user) => res.json(user));
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  /*
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json({ message: "Thought deleted successfully!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  */
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          // Delete associated reactions
          : Reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: "Thought and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction to a thought
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => {
        Thought.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { reactions: reaction._id } },
          { runValidators: true, new: true }
        ).then((thought) => res.json(thought));
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  /*
  console.log("You are adding a reaction!");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.params.reactionId } },            
      { runValidators: true, new: true }      
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  */
  // Remove a reaction to a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

const { connect, connection } = require("mongoose");

// TODO: Review this syntax
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/networkDB";

// TODO: Review this syntax
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

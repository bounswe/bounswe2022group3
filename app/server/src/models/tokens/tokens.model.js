const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
    },
    access_token: {
      type: String, // empty or unique
    },
    refresh_token: {
      type: String,
    },
    confirmation_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Tokens = mongoose.model("Tokens", tokenSchema);

const createToken = async ({
  email,
  access_token,
  refresh_token,
  confirmation_token,
}) => {
  let tokens = await getTokensByEmail(email);
  if (!tokens) {
    tokens = new Tokens({
      email: email,
    });
  }
  tokens.access_token = access_token;
  tokens.refresh_token = refresh_token;
  tokens.confirmation_token = confirmation_token;
  const res = await tokens.save();
  return res;
};

const getTokensByEmail = async (email) => {
  const result = await Tokens.findOne({ email }).exec();
  return result;
};

module.exports = { Tokens, createToken, getTokensByEmail };

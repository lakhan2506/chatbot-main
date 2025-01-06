const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userMessage: String,
  botMessage: String,
  filteredProducts: [
    {
      id: Number,
      name: String,
      category: String,
      description: String,
      price: Number,
    },
  ],
  userId: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);

const ChatMessage = require("../models/ChatMessage");
const products = require("../data/mock_ecommerce_products.json");

const processMessage = async (req, res) => {
  const { userMessage, userId } = req.body;

  const stopwords = new Set(["show", "me", "find", "a", "for", "the", "in", "of", "is", "on", "with", "and"]);
  const keywords = userMessage
    .toLowerCase()
    .split(" ")
    .filter((word) => !stopwords.has(word) && word.length > 2);

  const filteredProducts = products.filter((product) =>
    keywords.some((keyword) =>
      product.name.toLowerCase().includes(keyword) || product.description.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword) 
    )
  );

  
  const botMessage = filteredProducts.length
    ? `Here are the products I found for "${userMessage}":`
    : `Sorry, I couldn't find any products matching "${userMessage}".`;

  const chatMessage = new ChatMessage({
    userId,
    userMessage,
    botMessage,
    filteredProducts,
  });

  try {
    await chatMessage.save();
    res.json({
      botMessage,
      filteredProducts,
    });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};



const getChatHistory = async (req, res) => {
  const { userId } = req.params; 
  try {
    const chatHistory = await ChatMessage.find({ userId }).sort({ timestamp: 1 });
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Error fetching chat history." });
  }
};

module.exports = { processMessage,getChatHistory };

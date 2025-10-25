const Message = require("../models/messagesModel");

const chatController = {

    sendMessage: async (req, res) => {
        const {sender_id, content, status} = req.body;
        try {
            const newMessage = await Message.create({
                sender_id, content, status
            });
            res.status(200).json({
                success: true,
                message: "Message sent successfully!",
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error sending message!",
                error: error.message
            })
        }
    }
};

module.exports = chatController;
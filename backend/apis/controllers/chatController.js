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
    },
    getAllMessages: async (req, res) => {
        const {limit, page} = req.query;
        const parsedLimit = limit ? JSON.parse(limit) : 100;
        const parsedPages = page ? JSON.parse(page) : 1;
        try {
            const {count, rows} = await Message.findAndCountAll({
                attributes: ["id", "sender_id", "content"],
                limit: parsedLimit,
                offset: (parsedPages - 1) * parsedLimit
            })
            const response = {
                rows,
                count,
                totalPages: Math.ceil(count/parsedLimit),
                currentPage: parsedPages
            }
            res.status(200).json({
                success: true,
                message: "All messages retrieved successfully!",
                data: response
            })
        } catch (error) {
            console.log(error);
            
            res.status(200).json({
                success: false,
                message: "Error retrieving messages!",
                error: error.message
            })
        }
    }
};

module.exports = chatController;
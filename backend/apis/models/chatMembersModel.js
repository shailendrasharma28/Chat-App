// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../../config/db-connection");
// const User = require("./userModel");
// const Conversation = require("./conversionModel");

// class ChatMember extends Model{};
// ChatMember.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: "users",
//             id: "key"
//         },
//     },
//     conversation_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: "conversations",
//             id: "key"
//         },
//     },
//     role: {
//         type: DataTypes.ENUM("admin", "member"),
//         default: "member"
//     }
// }, {
//     sequelize,
//     modelName: "ChatMember",
//     tableName: "chat_members",
// });

// User.belongsToMany(Conversation, {through: ChatMember, foreignKey: "user_id"});
// Conversation.belongsToMany(User, {through: ChatMember, foreignKey: "conversation_id"});

// module.exports = ChatMember;
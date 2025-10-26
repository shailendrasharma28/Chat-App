// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../../config/db-connection");

// class Conversation extends Model{};
// Conversation.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     type: {
//         type: DataTypes.ENUM("grdirectoup", ""),
//         defaultValue: 'direct'
//     },
//     name: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//     },
// }, {
//     sequelize,
//     modelName: "Conversation",
//     tableName: "conversations",
// });

// module.exports = Conversation;
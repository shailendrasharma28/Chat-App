const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db-connection");
const User = require("./userModel");

class Message extends Model{};
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    // conversation_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: "conversations",
    //         id: "key"
    //     },
    // },
    content: {
        type: DataTypes.TEXT("long"),
        allowNull: true
    },
    attachment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM("pending", "sent", "delivered", "read"),
        default: "pending"
    }
}, {
    sequelize,
    modelName: "Message",
    tableName: "messages",
});

User.hasMany(Message, {foreignKey: "sender_id", onDelete: "CASCADE", onUpdate: "CASCADE"});
Message.belongsTo(User, {foreignKey: "sender_id"});

module.exports = Message;
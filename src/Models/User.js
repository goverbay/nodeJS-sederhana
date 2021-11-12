const sequelize = require('./config');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    last_login: {
        type: DataTypes.DATE,
    },
    is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
    token_email: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
});

module.exports = User;
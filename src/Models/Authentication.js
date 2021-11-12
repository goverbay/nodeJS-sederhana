const sequelize = require('./config');
const {DataTypes} = require('sequelize');

const Authentication = sequelize.define('authentications', {
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Authentication;
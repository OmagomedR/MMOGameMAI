// server/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING,
        defaultValue: 'Unemployed'  // a.k.a. bomj
    },
    resource0: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    resource1: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    resource2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    resource3: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade1: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade3: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade1Praice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade2Praice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    trade3Praice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

});

module.exports = User;
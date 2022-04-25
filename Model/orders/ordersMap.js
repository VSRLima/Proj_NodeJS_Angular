const Sequelize = require('sequelize');
const database = require('../../db');
const Sellers = require('../sellers/sellersMap')

const Orders = database.define('orders', {
    orderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'sellers',
            key: 'id',
        }
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE
    }
});

Sellers.hasMany(Orders);
Orders.belongsTo(Sellers);


module.exports = Orders;
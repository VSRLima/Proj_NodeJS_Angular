const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    host: 'localhost'
});
const database = require('../../db');
const Orders = require('../../Model/orders/ordersMap');
const Sellers = require('../../Model/sellers/sellersMap');

module.exports = app => {
    const controller = {};

    controller.listOrders = async (req, res) => {
        try {
            const orders = await Orders.findAll({
                include: [{
                    model: Sellers,
                    require: true
                }]
            });
            
            res.status(200).json(orders);
        } catch (error) {
            res.status(404).json({
                message: 'Some errors occur. Please retry!',
                sucess: false,
            })
        }
    }

    controller.getOrderById = async (req, res) => {
        const {
            orderId,
        } = req.params;

        if(orderId == null || orderId == 0) {
            res.status(404).json({
                message: 'The Id passed is null or 0. Put a existent one and try again!',
                sucess: false,
            });
        }

        const order = await Orders.findByPk(orderId);

        if(order == undefined || order == null) {
            res.status(404).json({
                message: 'The requested order does not exists!',
                sucess: false,
            })
        } 

        res.status(200).json(order);
    }

    controller.saveOrders = (req, res) => {
        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            try {
                data = JSON.parse(data);

                const order = await Orders.create({
                    product: data.product,
                    sellerId: data.seller,
                    country: data.country,
                    price: data.price
                });

                res.status(201).json();
            } catch(error) {
                res.status(400).json();
            }
            
        });
    }
    
    controller.deleteOrders = (req, res) => {
        const {
            orderId,
        } = req.params;

        const order = Orders.findByPk(orderId);

        if(order == null || order == undefined) {
            res.status(404).json({
                message: 'Did not found any specified order in Database',
                sucess: false
            });
        } 

       Orders.destroy({where: {orderId: orderId}});
        res.status(200).json();
    };

    controller.updateOrder = (req, res) => {
        const {
            orderId,
        } = req.params;

        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            try {
                data = JSON.parse(data);

                const order = await Orders.findByPk(orderId);
                order.product = data.product;
                order.sellerId = data.seller;
                order.country = data.country;
                order.price = data.price

                const resultSave = await order.save();

                res.status(200).json();
            } catch (error) {
                res.status(400).json();
            }
        });
    }

    return controller;
}
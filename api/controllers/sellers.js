const sequelize = require('../../db');
const Orders = require('../../Model/orders/ordersMap');
const Sellers = require('../../Model/sellers/sellersMap');

module.exports = app => {
    const controller = {};

    controller.listSellers = async (req, res) => {
        try {
            const sellers = await Sellers.findAll();
            
            res.status(200).json(sellers);
        } catch (error) {
            res.status(404).json({
                message: 'Some errors occur. Please retry',
                success: false
            })
        }
    };

    controller.getSellerById = async (req, res) => {
        const {
            sellerId,
        } = req.params;

        if(sellerId == null || sellerId == 0) {
            res.status(404).json({
                message: 'The Id passed is null or 0. Put a existent one and try again!',
                sucess: false,
            });
        }

        const seller = await Sellers.findByPk(sellerId);

        if(seller == undefined || seller == null) {
            res.status(404).json({
                message: 'The requested seller does not exists!',
                sucess: false,
            })
        }

        res.status(200).json(seller);
    }

    controller.saveSellers = (req, res) => {
        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });
        
        req.on('end', async () => {
            try {
                data = JSON.parse(data);

                const seller = await Sellers.create({
                    name: data.name
                });
        
                res.status(201).json();
            } catch (error) {
                res.status(400).json({
                    message: 'Some error had occur. Please try again later!',
                    sucess: false,
                });
            }
        });
    }

    controller.deleteSeller = (req, res) => {
        const {
            sellerId,
        } = req.params;

        const seller = Sellers.findByPk(sellerId);

        if(seller == null || seller == undefined) {
            res.status(404).json({
                message: 'Did not found any specified seller in Database',
                success: false
            });
        }

        Sellers.destroy({where: {id: sellerId}});
        res.status(200).json()
    }

    controller.updateSeller = (req, res) => {
        const {
            sellerId,
        } = req.params;

        var data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            try {
                data = JSON.parse(data);

                const seller = await Sellers.findByPk(sellerId);
                seller.name = data.name;

                const resultSave = await seller.save();

                res.status(200).json();
            } catch (error) {
                console.log(error)
                res.status(400).json();
            }
        })
    }

    controller.topSellers = async (req, res) => {
        try {
            const result = await sequelize.query("SELECT s.Id, s.Name, SUM(o.price) as totalPrice FROM orders as o INNER JOIN sellers as s ON s.id = o.sellerId GROUP BY s.Id, s.Name ORDER BY totalPrice DESC LIMIT 3");

            res.status(200).json(result);
        } catch (error) {
            res.status(400).json();
        }        
    }
    return controller;
}
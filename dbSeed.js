const database = require('./db');
const mockOrder = require('./api/data/orders.json');
const mockSeller = require('./api/data/sellers.json')
const ordersMap = require('./Model/orders/ordersMap');
const sellersMap = require('./Model/sellers/sellersMap');
const sequelize = require('./db');


(async () => {
    try {
        const result = await database.sync();
        await insertSellers();
        await insertOrders();
    } catch (error) {
        console.log(error);
    }  
})();

async function insertOrders () {
    try {
        const orderExisted = await ordersMap.findAll();

        if(orderExisted.length == 0) {
            mockOrder.orders.data.forEach(async element => {
                try {
                    const orderInsert = await ordersMap.create({
                        product: element.product,
                        sellerId: element.seller,
                        country: element.country,
                        price: element.price
                    });
        
                    console.log('orderInsert',orderInsert);
                } catch (error) {
                    console.log('orderInsertError', orderInsert);
                }
                
            });
        }
    } catch (error) {
        console.log(error)
    }
};

async function insertSellers() {
    try {
        const sellerExisted = await sellersMap.findAll();

        if(sellerExisted.length == 0) {
            mockSeller.sellers.data.forEach(async element => {
                try {
                    const sellerInsert = await sellersMap.create({
                        name: element.name
                    });
        
                    console.log('sellerInsert', sellerInsert);
                } catch (error) {
                    console.log('sellerInsertError', sellerInsert);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

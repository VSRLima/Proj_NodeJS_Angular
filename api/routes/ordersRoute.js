module.exports = app => {
    const controllerOrders = app.controllers.orders;

    app.route('/api/getOrders')
        .get(controllerOrders.listOrders);

    app.route('/api/getOrderById/:orderId')
        .get(controllerOrders.getOrderById);  
        
    app.route('/api/saveOrder')
        .post(controllerOrders.saveOrders);

    app.route('/api/deleteOrder/:orderId')
        .delete(controllerOrders.deleteOrders);
    
    app.route('/api/updateOrder/:orderId')
        .put(controllerOrders.updateOrder);
}
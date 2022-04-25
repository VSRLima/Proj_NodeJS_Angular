module.exports = app => {
    const controllerSellers = app.controllers.sellers;

    app.route('/api/getSellers')
        .get(controllerSellers.listSellers);

    app.route('/api/getSellerById/:sellerId')
        .get(controllerSellers.getSellerById);

    app.route('/api/saveSeller')
        .post(controllerSellers.saveSellers);

    app.route('/api/updateSeller/:sellerId')
        .put(controllerSellers.updateSeller);

    app.route('/api/deleteSeller/:sellerId')
        .delete(controllerSellers.deleteSeller);

    app.route('/api/topSellers')
        .get(controllerSellers.topSellers);
}
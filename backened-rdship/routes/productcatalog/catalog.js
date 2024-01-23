
 const productCatalogcontroller  = require("../../controllers/productCatalogcontroller/catalog.controller")
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    // add brand
    app.post("/add-brand",productCatalogcontroller.addBrand);
    app.post("/update-brand",productCatalogcontroller.updateBrand);


}
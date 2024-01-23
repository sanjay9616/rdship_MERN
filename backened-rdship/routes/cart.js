const cart = require("../controllers/cart.controller");
const URL_LIST = require("../config/urlList.config");
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post('/addToCart',cart.addToCart);

}
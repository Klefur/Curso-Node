const authRouter = require("./auth");
const categoryRouter = require("./categories");
const userRouter = require("./users");
const productRouter = require("./products");
const searchRouter = require("./search");
const uploadRouter = require("./uploads");

module.exports = {
    authRouter,
    categoryRouter,
    userRouter,
    productRouter,
    searchRouter,
    uploadRouter,
}
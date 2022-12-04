"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const sellerRoutes_1 = __importDefault(require("./src/routes/sellerRoutes"));
const categoryRoutes_1 = __importDefault(require("./src/routes/categoryRoutes"));
const subcategoryRoutes_1 = __importDefault(require("./src/routes/subcategoryRoutes"));
const productRoutes_1 = __importDefault(require("./src/routes/productRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const MONGO_URI = "mongodb+srv://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@cluster0.1bqmy.mongodb.net/CandyCake?retryWrites=true&w=majority";
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('our db as connect');
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(userRoutes_1.default);
    app.use(sellerRoutes_1.default);
    app.use(categoryRoutes_1.default);
    app.use(subcategoryRoutes_1.default);
    app.use(productRoutes_1.default);
    app.listen(process.env.PORT, () => {
        console.log('server on');
    });
})
    .catch((err) => console.log(err));

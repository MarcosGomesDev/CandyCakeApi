"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = "mongodb+srv://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@cluster0.1bqmy.mongodb.net/CandyCake?retryWrites=true&w=majority";
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('our db as connect');
})
    .catch((err) => console.log(err));

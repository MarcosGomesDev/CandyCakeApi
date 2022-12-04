"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authUser_1 = __importDefault(require("../App/middlewares/authUser"));
const createCategory_1 = __importDefault(require("../App/useCases/category/createCategory"));
const listCategories_1 = __importDefault(require("../App/useCases/category/listCategories"));
const categoryRoutes = express_1.default.Router();
categoryRoutes.get('/categories', listCategories_1.default);
categoryRoutes.post('/category/new', authUser_1.default, createCategory_1.default);
exports.default = categoryRoutes;

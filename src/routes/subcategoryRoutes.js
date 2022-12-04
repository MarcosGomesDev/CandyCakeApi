"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSubcategory_1 = __importDefault(require("../App/useCases/subcategory/createSubcategory"));
const listSubcategories_1 = __importDefault(require("../App/useCases/subcategory/listSubcategories"));
const authUser_1 = __importDefault(require("../App/middlewares/authUser"));
const subcategoryRoutes = express_1.default.Router();
subcategoryRoutes.get('/subcategories', listSubcategories_1.default);
subcategoryRoutes.post('/subcategory/new', authUser_1.default, createSubcategory_1.default);
exports.default = subcategoryRoutes;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../Models/Product"));
const listProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.default.findOne({ _id: id }, { createdAt: 0, publicImages: 0 })
            .populate({
            path: 'category',
            select: ['name']
        })
            .populate({
            path: 'subcategory',
            select: ['name']
        })
            .populate({
            path: 'seller',
            select: ['name', 'storename', 'socialMedias']
        });
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.default = listProduct;

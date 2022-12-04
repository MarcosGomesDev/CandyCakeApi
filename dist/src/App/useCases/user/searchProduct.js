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
const getDistance_1 = __importDefault(require("../../../utils/getDistance"));
const Product_1 = __importDefault(require("../../Models/Product"));
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, longitude, latitude } = req.query;
    let { page, limit, rating, range } = req.query;
    const regex = new RegExp(`${name}`, 'i');
    if (!page)
        page = 1;
    if (!rating)
        rating = 0;
    if (!range)
        range = 5;
    if (!limit)
        limit = 20;
    const skip = (page - 1) * 10;
    try {
        const products = yield Product_1.default.find({
            name: {
                $in: regex
            }
        }, { name: 1, price: 1, images: 1, ratingAverage: 1 })
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
            select: ['location', 'name', 'storename']
        }).skip(skip).limit(limit).exec();
        const productsDistances = [];
        products.map((product) => {
            let distance = (0, getDistance_1.default)(latitude, longitude, product.seller.location.coordinates[1], product.seller.location.coordinates[0]);
            productsDistances.push({ distance: parseFloat(distance) });
        });
        const list = products.map((item, i) => (Object.assign(Object.assign({}, item._doc), productsDistances[i])))
            .filter((item) => item.distance <= range && item.ratingAverage >= rating);
        const result = list.sort((a, b) => a.distance - b.distance);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao retornar produtos com esse filtro');
    }
});
exports.default = searchProduct;

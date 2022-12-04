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
const AverageFunction_1 = require("../../../utils/AverageFunction");
const Product_1 = __importDefault(require("../../Models/Product"));
const removeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuth } = req; // o user já vai pra requisição pelo "isAuth" chamado na rota
    const { id } = req.params; //id do produto a ser avaliado
    try {
        const product = yield Product_1.default.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory');
        let productDelete = yield Product_1.default.findOne({ _id: id });
        let oldRating = productDelete.rating;
        const result = oldRating.find(i => i.userId.toString() === userAuth.toString());
        yield product.updateOne({
            $pull: {
                rating: {
                    userId: userAuth
                },
                ratingNumbers: result.productRating
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
    try { // Calcs
        // totally updated product, used to do the average calcs
        const productUpdated = yield Product_1.default.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory');
        if (productUpdated.ratingNumbers.length === 0) {
            yield productUpdated.updateOne({
                $set: {
                    ratingSum: 0,
                    ratingAverage: 0
                }
            }, { new: true });
        }
        else {
            yield productUpdated.updateOne({
                $set: {
                    ratingSum: (0, AverageFunction_1.sumOfArray)(productUpdated.ratingNumbers),
                    ratingAverage: (0, AverageFunction_1.averageOfArray)(productUpdated.ratingNumbers)
                }
            }, { new: true });
        }
        productUpdated.save();
    }
    catch (error) {
        return res.status(500).json('Internal server error');
    }
    return res.status(200).json('Avaliação excluída com sucesso!');
});
exports.default = removeComment;

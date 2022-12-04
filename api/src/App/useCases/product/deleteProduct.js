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
const cloudinaryAuth_1 = __importDefault(require("../../../helper/cloudinaryAuth"));
const Product_1 = __importDefault(require("../../Models/Product"));
const Seller_1 = __importDefault(require("../../Models/Seller"));
const User_1 = __importDefault(require("../../Models/User"));
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { id } = req.params;
    try {
        const prod = yield Product_1.default.findById({ _id: id });
        for (let index = 0; index < prod.publicImages.length; index++) {
            const file = prod.publicImages[index];
            yield cloudinaryAuth_1.default.uploader.destroy(file);
        }
        yield Product_1.default.findByIdAndDelete({ _id: id });
        yield Seller_1.default.findOneAndUpdate({ products: id }, {
            $pull: {
                products: id
            }
        });
        yield User_1.default.findOneAndUpdate({ favorites: id }, {
            $pull: {
                favorites: id
            }
        });
        return res.status(200).json('Produto deletado com sucesso');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao deletar o produto');
    }
});
exports.default = deleteProduct;

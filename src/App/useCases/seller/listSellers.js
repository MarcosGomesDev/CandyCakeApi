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
const Seller_1 = __importDefault(require("../../Models/Seller"));
const listSellers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    if (!sellerAuth) {
        return res.status(401).json('Autorização inválida');
    }
    const seller = yield Seller_1.default.findById(sellerAuth);
    if (seller.admin === false) {
        return res.status(401).json('Você não tem permissão para acessar!');
    }
    try {
        const sellers = yield Seller_1.default.find();
        return res.status(200).json(sellers);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao retornar os vendedores, tente novamente mais tarde');
    }
});
exports.default = listSellers;

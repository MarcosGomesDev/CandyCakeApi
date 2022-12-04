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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Seller_1 = __importDefault(require("../Models/Seller"));
const isSellerAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET);
            const { id } = decode;
            const sellerAuth = yield Seller_1.default.findById(id);
            if (!sellerAuth) {
                return res.status(401).json('Autorização inválida do usuário!');
            }
            req.sellerAuth = id;
            return next();
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json('Autorização inválida do usuário!');
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(413).json('Sessão expirada, por favor faça login');
            }
            return res.status(500).json('Internal Server Error');
        }
    }
    else {
        return res.status(400).json('Autorização inválida!');
    }
});
exports.default = isSellerAuth;

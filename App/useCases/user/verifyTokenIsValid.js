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
const TokenForgotPassword_1 = __importDefault(require("../../Models/TokenForgotPassword"));
const verifyTokenIsValid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const verifyToken = yield TokenForgotPassword_1.default.findOne({ token: token });
        if (!verifyToken) {
            return res.status(401).json("Token inválido ou expirado!");
        }
        return res.status(200).json('Token verificado!');
    }
    catch (error) {
        return res.status(500).json('Erro, tente novamente mais tarde');
    }
});
exports.default = verifyTokenIsValid;

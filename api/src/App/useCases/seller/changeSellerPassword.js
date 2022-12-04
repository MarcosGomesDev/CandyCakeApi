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
const Seller_1 = __importDefault(require("../../Models/Seller"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const date = (0, moment_1.default)().format('LLL');
const changeSellerPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    try {
        if (!password) {
            return res.status(401).json("Por favor insira a senha!");
        }
        const validToken = yield TokenForgotPassword_1.default.findOne({ token: token });
        if (!validToken) {
            return res.status(401).json("Token inválido ou expirado!");
        }
        const seller = yield Seller_1.default.findOne({ _id: validToken.id });
        const checkPassword = yield bcrypt_1.default.compare(password, seller.password);
        if (checkPassword) {
            return res.status(401).json('A senha deve ser diferente da anterior!');
        }
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        console.log(passwordHash, seller === null || seller === void 0 ? void 0 : seller.password);
        yield Seller_1.default.findOneAndUpdate({ _id: seller === null || seller === void 0 ? void 0 : seller._id }, {
            $set: {
                password: passwordHash,
                updatedAt: date
            }
        });
        yield validToken.delete();
        return res.status(200).json("Senha alterada com sucesso!");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro interno, tente novamente mais tarde!');
    }
});
exports.default = changeSellerPassword;

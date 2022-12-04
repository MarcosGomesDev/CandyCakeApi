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
const moment_1 = __importDefault(require("moment"));
const Seller_1 = __importDefault(require("../../Models/Seller"));
const date = (0, moment_1.default)().format('LLL');
const updateContactsSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { instagram, whatsapp, facebook } = req.body;
    try {
        const seller = yield Seller_1.default.findById(sellerAuth);
        if (!seller) {
            return res.status(400).json('Este usuário não existe!');
        }
        yield seller.updateOne({
            $set: {
                socialMedias: {
                    instagram: instagram,
                    whatsapp: whatsapp,
                    facebook: facebook
                },
                updatedAt: date
            }
        });
        const data = yield Seller_1.default.findById(sellerAuth);
        return res.status(201).json({ message: 'Dados atualizados com sucesso', data: data.socialMedias });
    }
    catch (error) {
        return res.status(500).json('Erro ao atualizar dados do vendedor');
    }
    ;
});
exports.default = updateContactsSeller;

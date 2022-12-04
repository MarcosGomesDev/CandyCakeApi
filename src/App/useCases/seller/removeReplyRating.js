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
const removeReplyRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { replyId } = req.params;
    try {
        yield Product_1.default.updateMany({ "rating._id": replyId }, {
            $pull: {
                "rating.$[element].replyRating": {
                    sellerId: sellerAuth
                }
            }
        }, { arrayFilters: [{ "element._id": replyId }] });
        return res.status(201).json("Resposta excluida com sucesso!");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao excluir resposta, tente novamente mais tarde!');
    }
});
exports.default = removeReplyRating;

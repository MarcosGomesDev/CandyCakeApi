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
const User_1 = __importDefault(require("../../Models/User"));
const replyRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { commentId } = req.params;
    const { replyComment } = req.body;
    try {
        const user = yield User_1.default.findById(sellerAuth);
        yield Product_1.default.updateMany({ "rating._id": commentId }, {
            $set: {
                "rating.$[element].replyRating": {
                    sellerId: sellerAuth,
                    sellerName: user.name,
                    replyReview: replyComment
                }
            }
        }, { arrayFilters: [{ "element._id": commentId }] });
        return res.status(201).json('Resposta enviada com sucesso!');
    }
    catch (error) {
        return res.status(500).json('Internal Server Error');
    }
});
exports.default = replyRating;

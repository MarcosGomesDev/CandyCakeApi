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
const User_1 = __importDefault(require("../../Models/User"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuth } = req;
    const { name, lastname, email } = req.body;
    try {
        yield User_1.default.findByIdAndUpdate({ _id: userAuth }, {
            $set: {
                name,
                lastname,
                email
            }
        });
        return res.status(200).json('Dados atualizados com sucesso!');
    }
    catch (error) {
        return res.status(500).json('Erro ao atualizar dados do usuário, tente novamente mais tarde!');
    }
});
exports.default = updateUser;

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
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const TokenForgotPassword_1 = __importDefault(require("../../Models/TokenForgotPassword"));
const User_1 = __importDefault(require("../../Models/User"));
const forgotPasswordUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User_1.default.findOne({ email: email });
    if (!user) {
        return res.status(401).json('Usuário não encontrado');
    }
    try {
        const token = yield TokenForgotPassword_1.default.findOne({ id: user._id });
        if (token !== null) {
            yield TokenForgotPassword_1.default.findByIdAndDelete({ _id: token._id });
        }
        const sort = Math.floor(100000 + Math.random() * 900000);
        const newResetToken = yield new TokenForgotPassword_1.default({
            id: user._id,
            token: sort,
            expiresIn: 300,
        }).save();
        const link = `${newResetToken.token}`;
        console.log(link);
        yield (0, sendEmail_1.default)(user.email, "Redefinir senha", `Seu código de redefinição de senha é: ${link}, Token válido por 5 minutos!`);
        return res.status(200).json("Token de redefinição de senha foi enviado ao email");
    }
    catch (error) {
        return res.status(500).json('Erro ao enviar token, tente novamente mais tarde!');
    }
});
exports.default = forgotPasswordUser;

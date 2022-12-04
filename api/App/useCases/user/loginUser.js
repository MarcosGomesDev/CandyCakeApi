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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../Models/User"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(401).json('Usuário não existe!');
        }
        const checkPassword = bcrypt_1.default.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json('Senha inválida!');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, process.env.SECRET, { expiresIn: '1d' });
        const data = {
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            avatar: user.avatar,
            seller: user.seller,
            admin: user.admin,
            token: token,
        };
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }
});
exports.default = loginUser;

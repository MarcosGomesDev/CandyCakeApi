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
const moment_1 = __importDefault(require("moment"));
const User_1 = __importDefault(require("../../Models/User"));
const date = (0, moment_1.default)().format('LLL');
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password } = req.body;
    if (!name) {
        return res.status(401).json('O nome é obrigatório!');
    }
    if (!email) {
        return res.status(401).json('O email é obrigatório!');
    }
    if (!password) {
        return res.status(401).json('A senha é obrigatória!');
    }
    // VERIFICA SE O USUÁRIO EXISTE
    const userExist = yield User_1.default.findOne({ email: email });
    if (userExist) {
        return res.status(401).json('Este email já está sendo utilizado!');
    }
    // CRIPTOGRAFA A SENHA INSERIDA
    const salt = yield bcrypt_1.default.genSalt(12);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    try {
        // MÉTODO PARA SALVAR UM NOVO USUÁRIO
        yield User_1.default.create({
            name,
            lastname,
            email,
            password: passwordHash,
            admin: false,
            seller: false,
            createdAt: date
        });
        return res.status(201).json('Úsuario criado com sucesso!');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao criar usuário, tente novamente mais tarde!');
    }
});
exports.default = createUser;

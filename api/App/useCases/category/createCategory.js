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
const Category_1 = __importDefault(require("../../Models/Category"));
const User_1 = __importDefault(require("../../Models/User"));
const date = (0, moment_1.default)().format('LLL');
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuth } = req;
    const { name } = req.body;
    if (!userAuth) {
        return res.status(401).json('Invalid authorization');
    }
    const user = yield User_1.default.findOne({ _id: userAuth });
    if (user.admin === false) {
        return res.status(401).json('Invalid authorization, u are not administrator');
    }
    const categoryExist = yield Category_1.default.findOne({ name: name });
    console.log(categoryExist);
    if (categoryExist) {
        return res.status(401).json('Categoria já existe');
    }
    try {
        const category = new Category_1.default({
            name,
            createdBy: userAuth,
            createdAt: date
        });
        yield category.save();
        return res.status(201).json('Categoria criada com sucesso!');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao criar categoria, tente novamente mais tarde!');
    }
});
exports.default = createCategory;

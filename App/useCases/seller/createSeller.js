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
const coordenadas_do_cep_1 = __importDefault(require("coordenadas-do-cep"));
const Seller_1 = __importDefault(require("../../Models/Seller"));
const date = (0, moment_1.default)().format('LLL');
const createSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, storename, email, credential, password, cep, logradouro, numero, complemento, bairro, localidade, UF } = req.body;
    console.log(req.body);
    //Validations
    if (!name)
        return res.status(401).json('O nome é obrigatório!');
    if (!email)
        return res.status(401).json('O email é obrigatório!');
    if (!storename)
        return res.status(401).json('O nome da loja é obrigatório!');
    if (!password)
        return res.status(401).json('A senha é obrigatória!');
    if (!credential)
        return res.status(401).json('O CPF é obrigatório!');
    //VERIFICA SE O CEP DO ENDEREÇO FOI INSERIDO
    if (!cep)
        return res.status(401).json('O cep é obrigatório!');
    //VERIFICA SE O ENDEREÇO FOI INSERIDO
    if (!logradouro)
        return res.status(401).json('O nome da rua é obrigatório!');
    //VERIFICA SE O NÚMERO DO ENDEREÇO FOI INSERIDO
    if (!numero)
        return res.status(401).json('O número do endereço é obrigatório!');
    //VERIFICA SE O BAIRRO FOI INSERIDO
    if (!bairro)
        return res.status(401).json('O bairro é obrigatório!');
    //VERIFICA SE A CIDADE FOI INSERIDA
    if (!localidade)
        return res.status(401).json('A cidade é obrigatória!');
    //VERIFICA SE O ESTADO FOI INSERIDO
    if (!UF)
        return res.status(401).json('O estado é obrigatório!');
    try {
        // VERIFIED IF SELLER EXISTS
        const sellerExist = yield Seller_1.default.findOne({ email: email });
        if (sellerExist) {
            return res.status(401).json('Este email já está sendo utilizado!');
        }
        //OBTÉM A LATITUDE E LONGITUDE DO ENDEREÇO
        const info = yield coordenadas_do_cep_1.default.getByCep(cep);
        // HASHING THE PASSWORD
        const salt = yield bcrypt_1.default.genSalt(12);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        // METHOD OF SAVE NEW SELLER
        const seller = new Seller_1.default({
            name,
            lastname,
            storename,
            email,
            credential,
            seller: true,
            admin: false,
            password: passwordHash,
            location: {
                type: 'Point',
                coordinates: [info.lon, info.lat],
            },
            address: [{
                    cep: cep,
                    street: logradouro,
                    number: numero,
                    complement: complemento,
                    neighborhood: bairro,
                    city: localidade,
                    state: UF
                }],
            createdAt: date
        });
        // SAVE NEW SELLER
        yield seller.save();
        // AFTER SAVE SHOW THIS
        return res.status(201).json('Vendedor criado com sucesso!');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao criar usuário, tente novamente mais tarde!');
    }
});
exports.default = createSeller;

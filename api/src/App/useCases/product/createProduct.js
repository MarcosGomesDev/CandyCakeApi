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
const cloudinaryAuth_1 = __importDefault(require("../../../helper/cloudinaryAuth"));
const Category_1 = __importDefault(require("../../Models/Category"));
const Product_1 = __importDefault(require("../../Models/Product"));
const Seller_1 = __importDefault(require("../../Models/Seller"));
const Subcategory_1 = __importDefault(require("../../Models/Subcategory"));
const date = (0, moment_1.default)().format('LLL');
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { name, price, description, category, subcategory } = req.body;
    if (!name) {
        return res.status(401).json('Por favor insira o nome do produto');
    }
    if (!price) {
        return res.status(401).json('Por favor insira o preço do produto');
    }
    if (!description) {
        return res.status(401).json('Por favor insira a descrição do produto');
    }
    const categorySend = yield Category_1.default.findOne({ name: category });
    if (!categorySend) {
        return res.status(401).json('Categoria não existe, por favor escolha outra');
    }
    const subCategorySend = yield Subcategory_1.default.findOne({ name: subcategory });
    if (!subCategorySend) {
        return res.status(401).json('Sub Categoria não existe, por favor escolha outra');
    }
    try {
        const images = [];
        const publicImages = [];
        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const result = yield cloudinaryAuth_1.default.uploader.upload(file.path, {
                public_id: `${file.filename}-${Date.now()}`,
                width: 500,
                height: 500,
                crop: 'fill',
                folder: "Products Images"
            });
            images.push(result.secure_url);
            publicImages.push(result.public_id);
        }
        const product = yield Product_1.default.create({
            name,
            price: price.replace(',', '.'),
            description,
            seller: sellerAuth,
            images,
            publicImages,
            category: categorySend._id,
            subcategory: subCategorySend._id,
            createdAt: date
        });
        const seller = yield Seller_1.default.findOne({ _id: sellerAuth });
        seller.products.push(product._id);
        yield seller.save();
        yield product.save();
        return res.status(201).json('Produto criado com sucesso!');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.default = createProduct;

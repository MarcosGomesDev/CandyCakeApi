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
const Subcategory_1 = __importDefault(require("../../Models/Subcategory"));
const date = (0, moment_1.default)().format('LLL');
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sellerAuth } = req;
    const { id } = req.params;
    const { name, price, description, category, subcategory } = req.body;
    if (!id) {
        return res.status(400).json('Produto não existe!');
    }
    if (!name) {
        return res.status(400).json('O nome não pode ser vazio!');
    }
    if (!price) {
        return res.status(400).json('O preço não pode ser vazio!');
    }
    if (!description) {
        return res.status(400).json('A descrição não pode ser vazia!');
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
        const product = yield Product_1.default.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory');
        if (!product) {
            return res.status(400).json('Este produto não existe!');
        }
        const newImages = [];
        const newPublicImages = [];
        if (req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const result = yield cloudinaryAuth_1.default.uploader.upload(file.path, {
                    public_id: `${file.filename}-${Date.now()}`,
                    width: 500,
                    height: 500,
                    crop: 'fill',
                    folder: "Products Images"
                });
                newImages.push(result.secure_url);
                newPublicImages.push(result.public_id);
            }
        }
        yield product.updateOne({
            $set: {
                name: name !== product.name ? name : product.name,
                price: price !== product.price ? price.replace(',', '.') : product.price,
                category: categorySend._id !== product.category._id ? categorySend : product.category,
                subcategory: subCategorySend._id !== product.subcategory._id ? subCategorySend : product.subcategory,
                images: req.files.length > 0 ? newImages : product.images,
                publicImages: req.files.length > 0 ? newPublicImages : product.publicImages,
                updatedAt: date
            }
        });
        return res.status(201).json('Produto atualizado com sucesso!');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro ao atualizar dados do produto, tente novamente mais tarde!');
    }
});
exports.default = updateProduct;

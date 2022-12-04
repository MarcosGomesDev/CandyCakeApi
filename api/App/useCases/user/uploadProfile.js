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
const User_1 = __importDefault(require("../../Models/User"));
const cloudinaryAuth_1 = __importDefault(require("../../../helper/cloudinaryAuth"));
const date = (0, moment_1.default)().format('LLL');
const uploadProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuth } = req;
    if (!userAuth) {
        return res.status(401).json("Acesso não autorizado");
    }
    const user = yield User_1.default.findOne({ _id: userAuth });
    if (user === null || user === void 0 ? void 0 : user.avatar) {
        yield cloudinaryAuth_1.default.uploader.destroy(`${user.avatarId}`);
    }
    try {
        const result = yield cloudinaryAuth_1.default.uploader.upload(req.file.path, {
            public_id: `${user._id}_profile`,
            width: 500,
            height: 500,
            crop: 'fill',
            folder: 'Avatars Users'
        });
        yield User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
            $set: {
                avatar: result.secure_url,
                avatarId: result.public_id,
                updatedAt: date
            }
        });
        return res.status(201).json({ message: 'Imagem alterada com sucesso', avatar: result.secure_url });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Erro interno no servidor');
    }
});
exports.default = uploadProfile;

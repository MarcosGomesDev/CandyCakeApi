"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authUser_1 = __importDefault(require("../App/middlewares/authUser"));
const uploadImage_1 = __importDefault(require("../App/middlewares/uploadImage"));
const addToFavorites_1 = __importDefault(require("../App/useCases/user/addToFavorites"));
const changeUserPassword_1 = __importDefault(require("../App/useCases/user/changeUserPassword"));
const createComment_1 = __importDefault(require("../App/useCases/user/createComment"));
const createUser_1 = __importDefault(require("../App/useCases/user/createUser"));
const deleteUser_1 = __importDefault(require("../App/useCases/user/deleteUser"));
const forgotPasswordUser_1 = __importDefault(require("../App/useCases/user/forgotPasswordUser"));
const listFavorites_1 = __importDefault(require("../App/useCases/user/listFavorites"));
const listUsers_1 = __importDefault(require("../App/useCases/user/listUsers"));
const loginUser_1 = __importDefault(require("../App/useCases/user/loginUser"));
const removeComment_1 = __importDefault(require("../App/useCases/user/removeComment"));
const removeToFavorites_1 = __importDefault(require("../App/useCases/user/removeToFavorites"));
const searchProduct_1 = __importDefault(require("../App/useCases/user/searchProduct"));
const updateUser_1 = __importDefault(require("../App/useCases/user/updateUser"));
const uploadProfile_1 = __importDefault(require("../App/useCases/user/uploadProfile"));
const verifyTokenIsValid_1 = __importDefault(require("../App/useCases/user/verifyTokenIsValid"));
const userRoutes = express_1.default.Router();
userRoutes.get('/', (res) => {
    try {
        return res.status(200).json('Api conectada com sucesso');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Problema ao conectar api');
    }
});
userRoutes.get('/users', authUser_1.default, listUsers_1.default);
userRoutes.get('/favorites', authUser_1.default, listFavorites_1.default);
userRoutes.get('/search', searchProduct_1.default);
userRoutes.post('/sign-up/user', createUser_1.default);
userRoutes.post('/sign-in/user', loginUser_1.default);
userRoutes.post('/favorites/:id', authUser_1.default, addToFavorites_1.default);
userRoutes.post('/forgotpassword/user', forgotPasswordUser_1.default);
userRoutes.post('/verifytoken', verifyTokenIsValid_1.default);
userRoutes.post('/product/:id/rating/new', authUser_1.default, createComment_1.default);
userRoutes.patch('/update', authUser_1.default, updateUser_1.default);
userRoutes.patch('/resetpassword/user/:token', changeUserPassword_1.default);
userRoutes.patch('/user/upload-profile', authUser_1.default, uploadImage_1.default.single('avatar'), uploadProfile_1.default);
userRoutes.delete('/product/:id/rating', authUser_1.default, removeComment_1.default);
userRoutes.delete('/favorites/:id', authUser_1.default, removeToFavorites_1.default);
userRoutes.delete('user/delete', authUser_1.default, deleteUser_1.default);
exports.default = userRoutes;

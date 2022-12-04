"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    avatarId: {
        type: String
    },
    seller: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    favorites: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }],
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    }
});
exports.default = mongoose_1.default.model('User', User);

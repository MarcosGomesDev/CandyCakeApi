"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const PointSchema_1 = __importDefault(require("../../utils/PointSchema"));
const Seller = new Schema({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    storename: {
        required: true,
        type: String
    },
    credential: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    avatar: {
        type: String
    },
    avatarId: {
        type: String
    },
    seller: {
        required: true,
        type: Boolean
    },
    admin: {
        required: true,
        type: Boolean
    },
    products: {
        type: [{
                type: Schema.Types.ObjectId,
                ref: 'Product'
            }]
    },
    location: {
        type: PointSchema_1.default,
        index: '2dsphere'
    },
    address: {
        type: [{
                cep: { type: String },
                street: { type: String },
                number: { type: String },
                complement: { type: String },
                neighborhood: { type: String },
                city: { type: String },
                state: { type: String }
            }]
    },
    socialMedias: [{
            instagram: {
                type: String
            },
            facebook: {
                type: String
            },
            whatsapp: {
                type: String
            }
        }],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Seller', Seller);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    },
    images: {
        required: true,
        type: [String]
    },
    publicImages: {
        required: true,
        type: [String]
    },
    seller: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Seller'
    },
    rating: {
        type: [{
                userName: {
                    type: String,
                    default: ''
                },
                userId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'User'
                },
                productRating: {
                    type: Number,
                    default: 0
                },
                productReview: {
                    type: String,
                    default: ''
                },
                replyRating: {
                    type: [{
                            sellerName: { type: String, default: '' },
                            sellerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Seller' },
                            replyReview: { type: String, default: '' }
                        }]
                }
            }]
    },
    ratingNumbers: {
        type: [Number]
    },
    ratingSum: {
        type: Number,
        default: 0
    },
    ratingAverage: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Product', Product);

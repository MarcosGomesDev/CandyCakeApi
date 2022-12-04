"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PointSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
});
/**Aqui eu especifico como serão os campos de coordenadas la
 * do meu modelo de Dev, pela documentação do mongo devo fazer isso em um arquivo separado
 * Primeiro a ser passado sempre = longitude
 * segundo a ser passado sempre = latitude
 * No google o esquema é 1° do query lat e o 2° long
 */
exports.default = PointSchema;

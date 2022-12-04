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
const AverageFunction_1 = require("../../../utils/AverageFunction");
const Product_1 = __importDefault(require("../../Models/Product"));
const User_1 = __importDefault(require("../../Models/User"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAuth } = req;
    const { id } = req.params;
    const { comment, rating_selected } = req.body;
    if (!comment) {
        return res.status(400).json('O comentário não pode ser vazio');
    }
    if (!rating_selected) {
        return res.status(400).json('Nota inválida');
    }
    // verify if the rating is inside the scope
    if (rating_selected > 5 || rating_selected < 1) {
        return res.status(400).json("Nota de avaliacao inválida");
    }
    try {
        const product = yield Product_1.default.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory');
        const user = yield User_1.default.findById(userAuth);
        if (product.rating.length >= 1) { // checking if we have 1 or more ratings
            // search for the previous rating of the user for this product
            const userRatingIdentifier = userAuth; // .toString() -> if necessary - retorna um tipo Object
            const previousUserRating = yield Product_1.default.find({ _id: id }, { rating: { $elemMatch: { userId: userRatingIdentifier } } });
            // console.log(previousUserRating) // to be tested
            // check if the user has at least 1 rating among product's rating
            if (previousUserRating[0].rating[0] === undefined) { // if he doesn't
                // creating a new rating
                console.log('Criando uma nova avaliação para o usuário');
                yield product.updateOne({
                    $push: {
                        rating: [{
                                userName: user === null || user === void 0 ? void 0 : user.name,
                                userId: userAuth,
                                productRating: rating_selected,
                                productReview: comment
                            }]
                    }
                });
                // add the new rate value to the array of rates
                yield product.updateOne({
                    $push: {
                        ratingNumbers: rating_selected
                    }
                });
            }
            else {
                // if the user already has a rating for the product
                const previousUserRatingValue = previousUserRating[0].rating[0].productRating;
                // update the old rating of the user
                yield Product_1.default.updateMany({ "rating.userId": userRatingIdentifier }, {
                    $set: {
                        "rating.$[element].userName": user === null || user === void 0 ? void 0 : user.name,
                        "rating.$[element].userId": userAuth,
                        "rating.$[element].productRating": rating_selected,
                        "rating.$[element].productReview": comment
                    }
                }, { arrayFilters: [{ "element.userId": userRatingIdentifier }] });
                // replace the old value of rating by the new one, inside the array of ratings
                yield Product_1.default.updateOne({ _id: id, ratingNumbers: previousUserRatingValue }, { $set: { "ratingNumbers.$": rating_selected } });
            }
            ;
        }
        else if (product.rating.length < 1) {
            // create the first rating for the product
            console.log('Nenhuma avaliação existente para este produto, criando uma nova');
            // console.log(user)
            // console.log("#####################################################################")
            // console.log(product)
            yield product.updateOne({
                $push: {
                    rating: {
                        userName: user === null || user === void 0 ? void 0 : user.name,
                        userId: userAuth,
                        productRating: rating_selected,
                        productReview: comment
                    },
                }
            });
            yield product.updateOne({
                $push: {
                    ratingNumbers: rating_selected
                }
            });
        }
        product.save();
    }
    catch (error) {
        return res.status(500).json('Internal Server Error');
    }
    try { // Calcs
        // totally updated product, used to do the average calcs
        const productUpdated = yield Product_1.default.findById(id)
            .populate('seller')
            .populate('category')
            .populate('subcategory');
        yield productUpdated.updateOne({
            $set: {
                ratingSum: (0, AverageFunction_1.sumOfArray)(productUpdated.ratingNumbers),
                ratingAverage: (0, AverageFunction_1.averageOfArray)(productUpdated.ratingNumbers)
            }
        }, { new: true });
        productUpdated.save();
    }
    catch (error) {
        return res.status(500).json('Internal server error');
    }
    return res.status(201).json('Avaliação inserida com sucesso!');
});
exports.default = createComment;

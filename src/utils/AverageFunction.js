"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageOfArray = exports.sumOfArray = void 0;
const sumOfArray = function (arr) {
    const initialValue = 0;
    const totalSum = arr.reduce((previousValue, currentValue) => previousValue + currentValue, initialValue);
    return totalSum;
};
exports.sumOfArray = sumOfArray;
const averageOfArray = function (arr) {
    return (((0, exports.sumOfArray)(arr)) / arr.length);
};
exports.averageOfArray = averageOfArray;

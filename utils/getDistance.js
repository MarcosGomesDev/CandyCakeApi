"use strict";
// const geolib = require('geolib')
Object.defineProperty(exports, "__esModule", { value: true });
const geolib_1 = require("geolib");
const getDistanceInKm = (latAtual, longAtual, latFinal, longFinal) => {
    let distanceInKm = (0, geolib_1.getDistance)({ latitude: latAtual, longitude: longAtual }, { latitude: latFinal, longitude: longFinal });
    const finalDistance = (distanceInKm / 1000).toFixed(1);
    return finalDistance;
};
exports.default = getDistanceInKm;

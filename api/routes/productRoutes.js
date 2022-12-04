import express from 'express';
import { listProducts } from '../controllers/products';
const productRoutes = express.Router()

productRoutes.get('/products', listProducts)

module.exports = productRoutes

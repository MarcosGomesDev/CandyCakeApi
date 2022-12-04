import express from 'express';
import { listCategories } from '../controllers/categories';
const categoryRoutes = express.Router()

categoryRoutes.get('/categories', listCategories)

module.exports = categoryRoutes

import express from 'express';
import { listcategories } from '../controllers/categories';
const categoryRoutes = express.Router()

categoryRoutes.get('/categories', listcategories)

module.exports = categoryRoutes

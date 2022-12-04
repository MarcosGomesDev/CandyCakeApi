import express from 'express';

import categoryRoutes from './api/routes/categoryRoutes'
import productRoutes from './api/routes/productRoutes'

const app = express()

app.use(categoryRoutes)
app.use(productRoutes)

app.listen(3003, () => {
    console.log('server on')
})


import express from 'express';

import categoryRoutes from './api/routes/categoryRoutes'
import categoryRoutes from './api/routes/categoryRoutes'

const app = express()

app.use(categoryRoutes)
app.use(productRoutes)

app.listen(3003, () => {
    console.log('server on')
})


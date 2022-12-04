import express from 'express';

import productRoutes from './api/routes/productRoutes'

const app = express()


app.use(productRoutes)

app.listen(3003, () => {
    console.log('server on')
})

